# Melhoria: Filtro de Registros Já Importados no `ImportarDadosFirebase`

## Contexto

O sistema Delphi (`uAdmRotas.pas`) possui dois fluxos principais de sincronização com o Firebase:

- **`EnviarRota`**: lê pedidos do banco SACI (SQL Server) e envia para o Firebase via PUT.
- **`ImportarDadosFirebase`**: lê dados do Firebase e salva no banco local nas tabelas `APP_*`.

O problema atual é que `ImportarDadosFirebase` busca **todos** os registros do Firebase a cada execução, sem nenhum critério de filtro. Registros já importados anteriormente são buscados, processados e descartados (pois a lógica de INSERT/UPDATE já verifica duplicidade localmente), gerando tráfego e processamento desnecessário.

## Objetivo

Buscar do Firebase **somente os registros ainda não importados**, marcando cada um como importado logo após salvar localmente. Na próxima execução, esses registros não serão mais retornados na consulta.

---

## Fluxo Proposto

```
ANTES:
  Firebase → busca TUDO → verifica duplicidade local → INSERT ou UPDATE (sem critério)

DEPOIS:
  Firebase → busca só onde importado = false → INSERT ou UPDATE → PATCH importado = true no Firebase
```

---

## Alterações Necessárias

As mudanças se dividem em três camadas: **Models**, **Controllers** e **uAdmRotas.pas**.

---

### Camada 1 — Models (adicionar campo `importado`)

Adicionar a propriedade `Importado: Boolean` em todos os models abaixo:

- `Rotas/Model/Model.Pedido.pas`
- `Rotas/Model/Model.Pendencia.pas`
- `Rotas/Model/Model.Checklist_Assistencia.pas`
- `Rotas/Model/Model.Checklist_Assistencia_Agua_Natural.pas`
- `Rotas/Model/Model.Produtos_Entregue.pas`
- `Rotas/Model/Model.Produtos_Recebido.pas`

**Em cada model, as alterações são:**

**1. Campo privado:**
```delphi
FImportado: Boolean;
```

**2. Propriedade pública:**
```delphi
property Importado: Boolean read FImportado write FImportado;
```

**3. Leitura no `FromJSON` (com fallback seguro para registros antigos que não têm o campo):**
```delphi
var
  ImportadoValue: TJSONValue;
...
ImportadoValue := AJSON.FindValue('importado');
if Assigned(ImportadoValue) and (ImportadoValue is TJSONBool) then
  Result.FImportado := (ImportadoValue as TJSONBool).AsBoolean
else
  Result.FImportado := False;
```

**4. Escrita no `ToJSON`:**
```delphi
Result.AddPair('importado', TJSONBool.Create(FImportado));
```

> **Importante:** o fallback `False` no `FromJSON` garante que registros gravados antes desta mudança (que não possuem o campo `importado`) sejam tratados como não importados e processados normalmente.

---

### Camada 2 — Controllers (filtrar ao buscar + método de marcação)

Afeta todos os controllers abaixo:

- `Rotas/Controller/Controller.Pedido.pas`
- `Rotas/Controller/Controller.Pendencia.pas`
- `Rotas/Controller/Controller.Checklist_Assistencia.pas`
- `Rotas/Controller/Controller.Checklist_Assistencia_Agua_Natural.pas`
- `Rotas/Controller/Controller.Produtos_Entregue.pas`
- `Rotas/Controller/Controller.Produtos_Recebido.pas`

#### 2a. Filtrar ao buscar no método `List()`

Em cada controller, dentro do método `List()`, onde hoje está:
```delphi
FRESTRequest.Resource := 'pedido.json'
```

Alterar para:
```delphi
FRESTRequest.Resource := 'pedido.json?orderBy="importado"&equalTo=false'
```

Isso usa a query nativa do Firebase Realtime Database. Apenas registros com `importado = false` (ou sem o campo, quando não indexado) serão retornados.

> Substituir `pedido` pelo nome correto do nó em cada controller: `pendencia`, `checklistAssistencia`, `checklistAssistenciaAguaNatural`, `produtosEntregue`, `produtosRecebido`.

#### 2b. Adicionar método `MarcarComoImportado`

Adicionar na **interface** de cada controller:
```delphi
procedure MarcarComoImportado(const AId: string);
```

Adicionar na **implementação**:
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
> O `PUT` sobrescreve o objeto inteiro no Firebase, apagando todos os outros campos.
> O `PATCH` atualiza apenas os campos informados no body, preservando o restante dos dados do registro.

---

### Camada 3 — `uAdmRotas.pas` (chamar marcação após salvar)

Em cada procedimento `Listar*` dentro de `ImportarDadosFirebase`, após o `aqrSalvar.ExecSQL` do registro principal, adicionar:

```delphi
LController.MarcarComoImportado(Lista[i].Id);
```

> `Lista[i].Id` é o identificador UUID gerado pelo Firebase (chave do nó), não o `CodigoExterno` do SACI.

#### Onde exatamente em cada procedimento:

**`ListarPedidos`** — após o ExecSQL do INSERT/UPDATE em `APP_PEDIDO_DE_VENDA`:
```delphi
aqrSalvar.ExecSQL;

// NOVO:
LController.MarcarComoImportado(Lista[i].Id);

// ... segue o loop de TiposPagamento e Itens
```

**`ListarPendencia`** — após o ExecSQL do INSERT em `APP_PENDENCIA`.

**`ListarChecklistAssistencia`** — após o ExecSQL do INSERT em `APP_CHECKLIST_ASSISTENCIA`.

**`ListarChecklistAssistenciaAguaNatural`** — após o ExecSQL do INSERT em `APP_CHECKLIST_ASSISTENCIA_A_N`.

**`ListarProdutosEntregue`** — após o ExecSQL do INSERT em `APP_PRODUTOS_ENTREGUE`.

**`ListarProdutosRecebido`** — após o ExecSQL do INSERT em `APP_PRODUTOS_RECEBIDO`.

---

## Configuração do Firebase — Índice Obrigatório

Para que a query `?orderBy="importado"&equalTo=false` funcione com performance no Firebase Realtime Database, é necessário adicionar regras de índice no console do Firebase em cada nó utilizado.

Sem o índice, o Firebase ainda executa a query, mas faz uma varredura completa e emite um warning. Com o índice, a filtragem é feita pelo próprio Firebase antes de retornar os dados.

**Regras a adicionar no Firebase Console → Realtime Database → Rules:**
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

> Verificar os nomes exatos dos nós no Firebase antes de aplicar as regras.

---

## Checklist de Implementação

- [ ] Adicionar `Importado: Boolean` em `Model.Pedido.pas`
- [ ] Adicionar `Importado: Boolean` em `Model.Pendencia.pas`
- [ ] Adicionar `Importado: Boolean` em `Model.Checklist_Assistencia.pas`
- [ ] Adicionar `Importado: Boolean` em `Model.Checklist_Assistencia_Agua_Natural.pas`
- [ ] Adicionar `Importado: Boolean` em `Model.Produtos_Entregue.pas`
- [ ] Adicionar `Importado: Boolean` em `Model.Produtos_Recebido.pas`
- [ ] Alterar filtro no `List()` de `Controller.Pedido.pas`
- [ ] Alterar filtro no `List()` de `Controller.Pendencia.pas`
- [ ] Alterar filtro no `List()` de `Controller.Checklist_Assistencia.pas`
- [ ] Alterar filtro no `List()` de `Controller.Checklist_Assistencia_Agua_Natural.pas`
- [ ] Alterar filtro no `List()` de `Controller.Produtos_Entregue.pas`
- [ ] Alterar filtro no `List()` de `Controller.Produtos_Recebido.pas`
- [ ] Adicionar `MarcarComoImportado` em todos os 6 controllers acima
- [ ] Chamar `MarcarComoImportado` em `ListarPedidos` (uAdmRotas.pas)
- [ ] Chamar `MarcarComoImportado` em `ListarPendencia` (uAdmRotas.pas)
- [ ] Chamar `MarcarComoImportado` em `ListarChecklistAssistencia` (uAdmRotas.pas)
- [ ] Chamar `MarcarComoImportado` em `ListarChecklistAssistenciaAguaNatural` (uAdmRotas.pas)
- [ ] Chamar `MarcarComoImportado` em `ListarProdutosEntregue` (uAdmRotas.pas)
- [ ] Chamar `MarcarComoImportado` em `ListarProdutosRecebido` (uAdmRotas.pas)
- [ ] Configurar índices no Firebase Realtime Database Rules
