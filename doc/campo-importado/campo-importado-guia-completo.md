# Campo `importado` — Guia Completo de Implementação

## Visão Geral do Problema

O sistema possui três atores que trocam dados entre si:

```
┌─────────────┐     cria registros      ┌─────────────────┐
│   App       │ ─────────────────────► │  Firebase       │
│  (Flutter)  │                         │  Realtime DB    │
└─────────────┘                         └────────┬────────┘
                                                  │
                                    busca não importados
                                                  │
                                         ┌────────▼────────┐
                                         │  Delphi / SACI  │
                                         │  (uAdmRotas.pas)│
                                         └────────┬────────┘
                                                  │
                                    salva no SQL Server local
                                         └────────┘

┌─────────────┐     cria registros      ┌─────────────────┐
│   App       │ ─────────────────────► │  BFF (API)      │
│  (Flutter)  │                         │  rotas-sz-bff   │
└─────────────┘                         └────────┬────────┘
                                                  │
                                    busca não importados
                                                  │
                                         ┌────────▼────────┐
                                         │  Delphi / SACI  │
                                         │  (uAdmRotas.pas)│
                                         └────────┬────────┘
                                                  │
                                    salva no SQL Server local
                                         └────────┘
```

O **Delphi (SACI)** roda `ImportarDadosFirebase` periodicamente. Hoje ele busca **todos** os registros a cada vez — incluindo os já importados — gerando tráfego e processamento desnecessário.

A solução é adicionar o campo `importado` em toda a cadeia:

- `importado: false` → registro criado pelo App, ainda não processado pelo SACI
- `importado: true` → SACI já processou e salvou no SQL Server local

---

## Diferença entre os dois caminhos: Firebase direto vs BFF (API)

O Delphi possui uma flag interna `FFirebase` que determina de onde ele busca os dados:

| `FFirebase` | Fonte dos dados | Protocolo de filtro |
|---|---|---|
| `True` | Firebase Realtime Database diretamente | Query string nativa do Firebase: `?orderBy="importado"&equalTo=false` |
| `False` | rotas-sz-bff (API Node.js + MongoDB) | Query param REST padrão: `GET /pedido?importado=false` |

Ambos os caminhos precisam das mesmas alterações de ponta a ponta, mas em camadas diferentes.

---

## Quais registros são afetados

| Feature | Nó Firebase | Endpoint BFF |
|---|---|---|
| Pedidos | `pedido` | `/pedido` |
| Pendências | `pendencia` | `/pendencia` |
| Checklist Assistência (Água Gelada) | `checklistAssistencia` | `/checklist-assistencia` |
| Checklist Assistência Água Natural | `checklistAssistenciaAguaNatural` | `/checklist-assistencia-agua-natural` |
| Produtos Entregue | `produtosEntregue` | `/produtos-entregue` |
| Produtos Recebido | `produtosRecebido` | `/produtos-recebido` |

> **Direção do fluxo:**
> - Pedidos fluem de **SACI → App** (o App só lê pedidos, não precisa controlar `importado` ao criar)
> - Os demais fluem de **App → SACI** (App cria, SACI importa)

---

---

# ETAPA 1 — App Flutter (rotas-sz-app)

O App é responsável por **criar** os registros. Sem o campo `importado: false` explícito, o Firebase não retornará esses registros na query do SACI.

## Por que o Firebase não retorna registros sem o campo?

O Firebase Realtime Database, ao receber `?orderBy="importado"&equalTo=false`, retorna **somente** os nós onde o campo `importado` existe e é explicitamente `false`. Um nó sem o campo é ignorado na query.

```json
// Registro criado pelo App SEM o campo → SACI nunca enxerga
{ "pedidoId": "abc", "pendencia": "RETORNO", "observacao": "..." }

// Registro criado pelo App COM o campo → SACI recebe normalmente
{ "pedidoId": "abc", "pendencia": "RETORNO", "observacao": "...", "importado": false }
```

## Por que a API (BFF) é menos crítica nesse ponto?

O schema Mongoose no BFF já possui `default: false` no campo `importado`. Então mesmo que o App não envie o campo, o MongoDB já o grava como `false` automaticamente. Mas enviar explicitamente é mais seguro.

---

## 1.1 — Adicionar o campo nos Models Dart

Em cada model/entity Dart, adicionar o campo `importado`:

```dart
class Pendencia {
  final String id;
  final String pedidoId;
  // ... campos existentes ...
  final bool importado; // NOVO

  const Pendencia({
    required this.id,
    required this.pedidoId,
    // ...
    this.importado = false, // default false ao construir
  });

  factory Pendencia.fromMap(Map<String, dynamic> map) {
    return Pendencia(
      id: map['id'] ?? '',
      pedidoId: map['pedidoId'] ?? '',
      // ...
      importado: map['importado'] ?? false, // fallback false para registros antigos
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'pedidoId': pedidoId,
      // ...
      'importado': importado, // NOVO — incluído no envio
    };
  }
}
```

> O `?? false` no `fromMap` garante que registros antigos (sem o campo) não quebrem o parse.

Aplicar o mesmo padrão nos models:
- `Pendencia`
- `ChecklistAssistencia`
- `ChecklistAssistenciaAguaNatural`
- `ProdutosEntregue`
- `ProdutosRecebido`

---

## 1.2 — Ao criar novos registros: sempre `importado: false`

No momento em que o App monta o objeto antes de enviar ao Firebase ou à API, garantir que `importado` seja `false`:

```dart
final pendencia = Pendencia(
  id: uuid.v4(),
  pedidoId: pedido.id,
  pendencia: 'RETORNO',
  observacao: observacaoController.text,
  importado: false, // sempre false ao criar
);

// Envia ao Firebase:
await firebaseRef.child('pendencia/${pendencia.id}').set(pendencia.toMap());

// OU envia à API:
await apiClient.post('/pendencia', body: pendencia.toMap());
```

---

## 1.3 — Ao atualizar registros via PUT no Firebase: preservar `importado`

Se o App fizer um PUT completo (substituição total do nó), o campo `importado` deve ser preservado. Caso contrário, um registro já marcado `importado = true` pelo SACI voltaria a aparecer na próxima busca.

**Opção A — Ler antes de escrever:**
```dart
// 1. Ler o estado atual
final snapshot = await firebaseRef.child('pendencia/$id').get();
final atual = Pendencia.fromMap(Map<String, dynamic>.from(snapshot.value as Map));

// 2. Montar com importado preservado
final atualizado = Pendencia(
  id: atual.id,
  pedidoId: novosPedidoId,
  observacao: novaObservacao,
  importado: atual.importado, // PRESERVAR
);

// 3. Enviar PUT
await firebaseRef.child('pendencia/$id').set(atualizado.toMap());
```

**Opção B (mais simples) — Usar `update()` em vez de `set()`:**
```dart
// Envia apenas os campos que mudaram — importado não é tocado
await firebaseRef.child('pendencia/$id').update({
  'observacao': novaObservacao,
});
```

> `set()` = PUT (substitui o nó inteiro). `update()` = PATCH (atualiza só os campos informados).

---

## 1.4 — Leitura de registros: tratar `importado` nas respostas

Com as mudanças no BFF e no Firebase, as respostas passarão a incluir o campo. O `map['importado'] ?? false` no `fromMap` já resolve isso (ver item 1.1).

Para **pedidos** especificamente: o App receberá pedidos com `importado` na resposta, mas deve simplesmente ignorar esse campo — ele é controle interno do SACI.

---

---

# ETAPA 2 — BFF / API (rotas-sz-bff)

O BFF é uma API Node.js + MongoDB (Mongoose). Quando `FFirebase = False`, o Delphi consome dados diretamente daqui em vez do Firebase.

O BFF precisa:
1. Aceitar o filtro `?importado=false` nos endpoints GET
2. Retornar o campo `importado` nas respostas
3. Aceitar o PATCH `{ "importado": true }` para marcar como importado

Cada feature passa pelas mesmas **5 camadas**.

---

## 2.1 — Entity (TypeScript interface)

**Arquivo de exemplo:** `src/features/pedidos/domain/entities/pedido.entity.ts`

Adicionar o campo na interface:

```typescript
// ANTES (último campo):
dadosPedidoDeCobranca?: string | null;

// DEPOIS:
dadosPedidoDeCobranca?: string | null;
importado?: boolean | null;
```

> `boolean | null` mantém consistência com os demais campos opcionais da interface.

---

## 2.2 — Mongoose Model (Schema)

**Arquivo de exemplo:** `src/features/pedidos/infra/models/pedido.mongoose.model.ts`

Adicionar o campo no schema:

```typescript
// ANTES (último campo do schema):
turno: { type: String, default: '' },

// DEPOIS:
turno: { type: String, default: '' },
importado: { type: Boolean, default: false },
```

> O `default: false` garante que documentos existentes (criados antes desta alteração) se comportem como não importados quando filtrados.

---

## 2.3 — Repository Interface

**Arquivo de exemplo:** `src/features/pedidos/domain/repositories/pedido.repository.interface.ts`

Adicionar o parâmetro `importado` no método `findAll`:

```typescript
// ANTES:
findAll(month?: number, year?: number, day?: number, codigoTecnico?: string): Promise<IPedido[]>;

// DEPOIS:
findAll(month?: number, year?: number, day?: number, codigoTecnico?: string, importado?: boolean): Promise<IPedido[]>;
```

---

## 2.4 — Repository Implementation

**Arquivo de exemplo:** `src/features/pedidos/infra/repositories/pedido.mongoose.repository.ts`

**Parte A — Incluir `importado` no `toEntity`:**

```typescript
// ANTES (final do objeto):
dadosPedidoDeCobranca: doc.dadosPedidoDeCobranca,

// DEPOIS:
dadosPedidoDeCobranca: doc.dadosPedidoDeCobranca,
importado: doc.importado,
```

**Parte B — Adicionar parâmetro e filtro no `findAll`:**

```typescript
// ANTES:
async findAll(month?: number, year?: number, day?: number, codigoTecnico?: string): Promise<IPedido[]> {
  const query: any = {};
  if (codigoTecnico !== undefined) {
    query.codigoTecnico = codigoTecnico;
  }

// DEPOIS:
async findAll(month?: number, year?: number, day?: number, codigoTecnico?: string, importado?: boolean): Promise<IPedido[]> {
  const query: any = {};
  if (codigoTecnico !== undefined) {
    query.codigoTecnico = codigoTecnico;
  }
  if (importado !== undefined) {
    query.importado = importado;
  }
```

> O restante do método (filtro de data, `.find(query)`) permanece igual.

---

## 2.5 — Controller

**Arquivo de exemplo:** `src/features/pedidos/presentation/pedidos.controller.ts`

**Parte A — Ler e repassar `importado` no GET:**

```typescript
// ANTES:
application.get("/pedido", async (req, res, next) => {
  try {
    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const year  = req.query.year  ? parseInt(req.query.year  as string) : undefined;
    const day   = req.query.day   ? parseInt(req.query.day   as string) : undefined;
    const codigoTecnico = req.query.tecnico as string | undefined;
    res.json(await this.repo.findAll(month, year, day, codigoTecnico));

// DEPOIS:
application.get("/pedido", async (req, res, next) => {
  try {
    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const year  = req.query.year  ? parseInt(req.query.year  as string) : undefined;
    const day   = req.query.day   ? parseInt(req.query.day   as string) : undefined;
    const codigoTecnico = req.query.tecnico as string | undefined;
    const importado = req.query.importado !== undefined
      ? req.query.importado === 'true'
      : undefined;
    res.json(await this.repo.findAll(month, year, day, codigoTecnico, importado));
```

> A conversão `=== 'true'` é necessária pois query params chegam como string. Quando não informado, `importado` fica `undefined` e o filtro não é aplicado — comportamento retrocompatível.

**Parte B — PATCH (já existe, não precisa de alteração):**

O `PATCH /pedido/:id` já repassa `req.body` ao `repo.update()`. Como o `update()` usa `findByIdAndUpdate` com os dados parciais, o campo será atualizado automaticamente assim que existir no schema. O Delphi envia:

```json
{ "importado": true }
```

---

## 2.6 — Arquivos por feature (resumo)

Aplicar o mesmo padrão das 5 camadas em cada feature:

| Feature | Caminho |
|---|---|
| Pedidos | `src/features/pedidos/` |
| Pendências | `src/features/pendencias/` |
| Checklist Assistência | `src/features/checklist-assistencia/` |
| Checklist Água Natural | `src/features/checklist-assistencia-agua-natural/` |
| Produtos Entregue | `src/features/produtos-entregue/` |
| Produtos Recebido | `src/features/produtos-recebido/` |

---

---

# ETAPA 3 — Firebase Realtime Database

O Firebase precisa de dois ajustes: os **dados** (campo `importado`) e a **performance** (índice para a query).

## 3.1 — Por que o índice é obrigatório

Sem índice, a query `?orderBy="importado"&equalTo=false` funciona, mas o Firebase faz uma **varredura completa** de todos os registros do nó antes de filtrar. O Firebase emite um warning no console e a performance degrada conforme o volume de dados cresce.

Com o índice, o Firebase filtra no banco antes de retornar — somente os registros com `importado = false` trafegam.

## 3.2 — Configurar os índices

No Firebase Console → Realtime Database → Rules, adicionar:

```json
{
  "rules": {
    "pedido": {
      ".indexOn": ["importado"]
    },
    "pendencia": {
      ".indexOn": ["importado"]
    },
    "checklistAssistencia": {
      ".indexOn": ["importado"]
    },
    "checklistAssistenciaAguaNatural": {
      ".indexOn": ["importado"]
    },
    "produtosEntregue": {
      ".indexOn": ["importado"]
    },
    "produtosRecebido": {
      ".indexOn": ["importado"]
    }
  }
}
```

> Verificar os nomes exatos dos nós antes de aplicar. Os nomes são case-sensitive no Firebase.

---

---

# ETAPA 4 — Delphi / SACI (uAdmRotas.pas)

O Delphi é o consumidor final. Ele roda `ImportarDadosFirebase` que chama `ListarPedidos`, `ListarPendencia` etc. Precisa de alterações em 3 camadas.

## 4.1 — Models Delphi: adicionar campo `Importado`

Nos arquivos de model Delphi, adicionar a propriedade em cada um:

- `Rotas/Model/Model.Pedido.pas`
- `Rotas/Model/Model.Pendencia.pas`
- `Rotas/Model/Model.Checklist_Assistencia.pas`
- `Rotas/Model/Model.Checklist_Assistencia_Agua_Natural.pas`
- `Rotas/Model/Model.Produtos_Entregue.pas`
- `Rotas/Model/Model.Produtos_Recebido.pas`

**Em cada model, adicionar:**

```delphi
// 1. Campo privado (na seção private):
FImportado: Boolean;

// 2. Propriedade pública (na seção public ou published):
property Importado: Boolean read FImportado write FImportado;

// 3. Leitura no FromJSON (com fallback seguro):
var
  ImportadoValue: TJSONValue;
begin
  // ... outros campos ...
  ImportadoValue := AJSON.FindValue('importado');
  if Assigned(ImportadoValue) and (ImportadoValue is TJSONBool) then
    Result.FImportado := (ImportadoValue as TJSONBool).AsBoolean
  else
    Result.FImportado := False; // fallback para registros antigos sem o campo

// 4. Escrita no ToJSON:
Result.AddPair('importado', TJSONBool.Create(FImportado));
```

> O fallback `False` no `FromJSON` é crítico: garante que registros gravados antes desta mudança (sem o campo) sejam tratados como não importados e processados normalmente.

---

## 4.2 — Controllers Delphi: filtrar ao buscar + método de marcação

Nos arquivos de controller Delphi:

- `Rotas/Controller/Controller.Pedido.pas`
- `Rotas/Controller/Controller.Pendencia.pas`
- `Rotas/Controller/Controller.Checklist_Assistencia.pas`
- `Rotas/Controller/Controller.Checklist_Assistencia_Agua_Natural.pas`
- `Rotas/Controller/Controller.Produtos_Entregue.pas`
- `Rotas/Controller/Controller.Produtos_Recebido.pas`

### Parte A — Filtrar no método `List()`

No método `List()` de cada controller, onde está o `FRESTRequest.Resource`, adicionar a query de filtro:

```delphi
// ANTES:
FRESTRequest.Resource := 'pedido.json';

// DEPOIS (caminho Firebase direto):
FRESTRequest.Resource := 'pedido.json?orderBy="importado"&equalTo=false';
```

> Substituir `pedido` pelo nó correto em cada controller:
> - `pendencia.json?orderBy="importado"&equalTo=false`
> - `checklistAssistencia.json?orderBy="importado"&equalTo=false`
> - `checklistAssistenciaAguaNatural.json?orderBy="importado"&equalTo=false`
> - `produtosEntregue.json?orderBy="importado"&equalTo=false`
> - `produtosRecebido.json?orderBy="importado"&equalTo=false`

Para o caminho BFF (`FFirebase = False`), a query vai no endpoint REST:

```delphi
// Exemplo para o caminho BFF:
FRESTRequest.Resource := 'pedido?importado=false';
```

### Parte B — Adicionar método `MarcarComoImportado`

Na **interface** de cada controller:
```delphi
procedure MarcarComoImportado(const AId: string);
```

Na **implementação**:
```delphi
procedure TControllerPedido.MarcarComoImportado(const AId: string);
begin
  FRESTRequest.Resource := Format(FTabela, [AId]);
  FRESTRequest.Method := rmPATCH;
  FRESTRequest.AddBody('{"importado": true}', TRESTContentType.ctAPPLICATION_JSON);
  FRESTRequest.Execute;
end;
```

> **Por que `rmPATCH` e não `rmPUT`?**
> - `PUT` substitui o objeto inteiro no Firebase — todos os outros campos do registro seriam apagados.
> - `PATCH` atualiza apenas os campos informados no body, preservando os demais dados do registro.
>
> O mesmo vale para o BFF: o endpoint `PATCH /pedido/:id` aplica `findByIdAndUpdate` parcial.

---

## 4.3 — `uAdmRotas.pas`: chamar marcação após salvar

Em cada procedimento `Listar*` dentro de `ImportarDadosFirebase`, **após** o `aqrSalvar.ExecSQL` que grava no SQL Server, adicionar a chamada de marcação:

```delphi
// Exemplo em ListarPedidos — após ExecSQL do INSERT/UPDATE em APP_PEDIDO_DE_VENDA:
aqrSalvar.ExecSQL;

// NOVO — marcar como importado no Firebase (ou BFF):
LController.MarcarComoImportado(Lista[i].Id);

// ... segue o loop de TiposPagamento e Itens
```

> `Lista[i].Id` é o UUID gerado pelo Firebase (chave do nó), **não** o `CodigoExterno` do SACI.

Fazer o mesmo em:
- `ListarPendencia` → após ExecSQL em `APP_PENDENCIA`
- `ListarChecklistAssistencia` → após ExecSQL em `APP_CHECKLIST_ASSISTENCIA`
- `ListarChecklistAssistenciaAguaNatural` → após ExecSQL em `APP_CHECKLIST_ASSISTENCIA_A_N`
- `ListarProdutosEntregue` → após ExecSQL em `APP_PRODUTOS_ENTREGUE`
- `ListarProdutosRecebido` → após ExecSQL em `APP_PRODUTOS_RECEBIDO`

---

---

# Fluxo Completo: passo a passo de uma sincronização

```
1. App (Flutter) cria uma pendência:
   → monta objeto com importado: false
   → envia PUT para Firebase: pendencia/{uuid}.json
   → OU envia POST para BFF: /pendencia
   → registro gravado com importado = false

2. Firebase (Realtime DB):
   → armazena o nó com importado: false
   → índice em importado permite query eficiente

3. Delphi (SACI) executa ImportarDadosFirebase:

   3a. Caminho Firebase (FFirebase = True):
       → Controller.Pendencia.List() busca:
         pendencia.json?orderBy="importado"&equalTo=false
       → Firebase retorna SOMENTE registros com importado = false

   3b. Caminho BFF (FFirebase = False):
       → Controller.Pendencia.List() busca:
         GET /pendencia?importado=false
       → BFF consulta MongoDB com filtro { importado: false }
       → Retorna somente registros não importados

4. Delphi processa cada registro:
   → ListarPendencia faz INSERT/UPDATE em APP_PENDENCIA (SQL Server)
   → aqrSalvar.ExecSQL

5. Delphi marca como importado:
   → LController.MarcarComoImportado(Lista[i].Id)

   5a. Caminho Firebase:
       → PATCH pendencia/{uuid}.json com body {"importado": true}
       → Firebase atualiza SOMENTE o campo importado, preservando os demais

   5b. Caminho BFF:
       → PATCH /pendencia/{uuid} com body {"importado": true}
       → MongoDB aplica $set parcial, preservando os demais campos

6. Na próxima execução do ImportarDadosFirebase:
   → registros com importado = true NÃO são retornados
   → apenas novos registros (importado = false) são processados
```

---

---

# Tabela Comparativa: Firebase vs BFF vs App

| Aspecto | App (Flutter) | Firebase (Realtime DB) | BFF (Node.js/MongoDB) | Delphi (SACI) |
|---|---|---|---|---|
| **Cria dados** | Sim — pendências, checklists, produtos | Armazena | Armazena | Não cria |
| **Lê dados** | Sim — pedidos, respostas | Sim | Sim | Sim — para importar |
| **Filtro por `importado`** | Não — só inclui no dado enviado | Via query string nativa | Via query param REST | Quem consome o filtro |
| **Marca como importado** | Não | Via PATCH (Delphi faz) | Via PATCH (Delphi faz) | Sim — após salvar local |
| **Protocolo de atualização parcial** | `update()` no SDK Firebase | `PATCH /{nó}.json` | `PATCH /endpoint/:id` | `rmPATCH` no TRESTRequest |
| **Onde `importado` vive** | No objeto Dart (`toMap`) | No nó JSON do Firebase | No documento MongoDB | Na property do Model Delphi |
| **Default quando ausente** | `?? false` no `fromMap` | Não retorna na query | `default: false` no schema | `False` no `FromJSON` |

---

---

# Checklist Global de Implementação

## App (Flutter)
- [ ] Adicionar `importado: bool` em `Pendencia` model
- [ ] Adicionar `importado: bool` em `ChecklistAssistencia` model
- [ ] Adicionar `importado: bool` em `ChecklistAssistenciaAguaNatural` model
- [ ] Adicionar `importado: bool` em `ProdutosEntregue` model
- [ ] Adicionar `importado: bool` em `ProdutosRecebido` model
- [ ] Garantir `importado: false` ao criar cada um dos 5 tipos de registro
- [ ] Verificar todos os pontos que fazem PUT completo no Firebase e migrar para `update()` ou preservar `importado`

## Firebase
- [ ] Configurar `.indexOn: ["importado"]` para o nó `pedido`
- [ ] Configurar `.indexOn: ["importado"]` para o nó `pendencia`
- [ ] Configurar `.indexOn: ["importado"]` para o nó `checklistAssistencia`
- [ ] Configurar `.indexOn: ["importado"]` para o nó `checklistAssistenciaAguaNatural`
- [ ] Configurar `.indexOn: ["importado"]` para o nó `produtosEntregue`
- [ ] Configurar `.indexOn: ["importado"]` para o nó `produtosRecebido`

## BFF — Pedidos
- [ ] `importado?: boolean | null` em `pedido.entity.ts`
- [ ] `importado: { type: Boolean, default: false }` em `pedido.mongoose.model.ts`
- [ ] Parâmetro `importado?: boolean` em `pedido.repository.interface.ts`
- [ ] Campo no `toEntity` + filtro no `findAll` em `pedido.mongoose.repository.ts`
- [ ] Ler query param e repassar ao `findAll` em `pedidos.controller.ts`

## BFF — Pendências
- [ ] `pendencia.entity.ts`
- [ ] `pendencia.mongoose.model.ts`
- [ ] `pendencia.repository.interface.ts`
- [ ] `pendencia.mongoose.repository.ts`
- [ ] `pendencias.controller.ts`

## BFF — Checklist Assistência
- [ ] `checklist-assistencia.entity.ts`
- [ ] `checklist-assistencia.mongoose.model.ts`
- [ ] `checklist-assistencia.repository.interface.ts`
- [ ] `checklist-assistencia.mongoose.repository.ts`
- [ ] `checklist-assistencia.controller.ts`

## BFF — Checklist Água Natural
- [ ] `checklist-assistencia-agua-natural.entity.ts`
- [ ] `checklist-assistencia-agua-natural.mongoose.model.ts`
- [ ] `checklist-assistencia-agua-natural.repository.interface.ts`
- [ ] `checklist-assistencia-agua-natural.mongoose.repository.ts`
- [ ] `checklist-assistencia-agua-natural.controller.ts`

## BFF — Produtos Entregue
- [ ] `produtos-entregue.entity.ts`
- [ ] `produtos-entregue.mongoose.model.ts`
- [ ] `produtos-entregue.repository.interface.ts`
- [ ] `produtos-entregue.mongoose.repository.ts`
- [ ] `produtos-entregue.controller.ts`

## BFF — Produtos Recebido
- [ ] `produtos-recebido.entity.ts`
- [ ] `produtos-recebido.mongoose.model.ts`
- [ ] `produtos-recebido.repository.interface.ts`
- [ ] `produtos-recebido.mongoose.repository.ts`
- [ ] `produtos-recebido.controller.ts`

## Delphi — Models
- [ ] `Importado: Boolean` em `Model.Pedido.pas`
- [ ] `Importado: Boolean` em `Model.Pendencia.pas`
- [ ] `Importado: Boolean` em `Model.Checklist_Assistencia.pas`
- [ ] `Importado: Boolean` em `Model.Checklist_Assistencia_Agua_Natural.pas`
- [ ] `Importado: Boolean` em `Model.Produtos_Entregue.pas`
- [ ] `Importado: Boolean` em `Model.Produtos_Recebido.pas`

## Delphi — Controllers
- [ ] Filtro `?orderBy="importado"&equalTo=false` em `Controller.Pedido.pas`
- [ ] Filtro `?orderBy="importado"&equalTo=false` em `Controller.Pendencia.pas`
- [ ] Filtro `?orderBy="importado"&equalTo=false` em `Controller.Checklist_Assistencia.pas`
- [ ] Filtro `?orderBy="importado"&equalTo=false` em `Controller.Checklist_Assistencia_Agua_Natural.pas`
- [ ] Filtro `?orderBy="importado"&equalTo=false` em `Controller.Produtos_Entregue.pas`
- [ ] Filtro `?orderBy="importado"&equalTo=false` em `Controller.Produtos_Recebido.pas`
- [ ] `MarcarComoImportado` em todos os 6 controllers acima

## Delphi — uAdmRotas.pas
- [ ] Chamar `MarcarComoImportado` em `ListarPedidos`
- [ ] Chamar `MarcarComoImportado` em `ListarPendencia`
- [ ] Chamar `MarcarComoImportado` em `ListarChecklistAssistencia`
- [ ] Chamar `MarcarComoImportado` em `ListarChecklistAssistenciaAguaNatural`
- [ ] Chamar `MarcarComoImportado` em `ListarProdutosEntregue`
- [ ] Chamar `MarcarComoImportado` em `ListarProdutosRecebido`
