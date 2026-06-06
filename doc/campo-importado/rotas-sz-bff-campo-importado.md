# Alterações no rotas-sz-bff: Campo `importado` para Controle de Sincronização

## Contexto

O cliente Delphi (`uAdmRotas.pas`) chama `ImportarDadosFirebase` para buscar registros da nuvem e salvar no banco local (SQL Server). Quando o projeto usa a API (`FFirebase = False`), os dados vêm do rotas-sz-bff em vez do Firebase diretamente.

O objetivo é que o Delphi:
1. Busque **somente registros com `importado = false`** (ainda não processados localmente)
2. Após salvar localmente, envie um `PATCH` marcando `importado = true`

Este documento detalha todas as alterações necessárias no rotas-sz-bff para suportar esse comportamento.

---

## Features Afetadas

As mesmas 6 features que o Delphi consome via `ImportarDadosFirebase`:

| Feature | Endpoint GET | Endpoint PATCH |
|---|---|---|
| Pedidos | `GET /pedido?importado=false` | `PATCH /pedido/:id` |
| Pendências | `GET /pendencia?importado=false` | `PATCH /pendencia/:id` |
| Checklist Assistência | `GET /checklist-assistencia?importado=false` | `PATCH /checklist-assistencia/:id` |
| Checklist Água Natural | `GET /checklist-assistencia-agua-natural?importado=false` | `PATCH /checklist-assistencia-agua-natural/:id` |
| Produtos Entregue | `GET /produtos-entregue?importado=false` | `PATCH /produtos-entregue/:id` |
| Produtos Recebido | `GET /produtos-recebido?importado=false` | `PATCH /produtos-recebido/:id` |

Cada feature passa pelas mesmas **4 camadas**: entity, model, repository interface, repository implementation e controller.
O padrão de alteração é idêntico para todas. O exemplo abaixo usa `pedidos` como referência.

---

## Camada 1 — Entity

**Arquivo:** `src/features/pedidos/domain/entities/pedido.entity.ts`

Adicionar o campo `importado` na interface `IPedido`:

```typescript
// ANTES (último campo da interface, linha ~64):
dadosPedidoDeCobranca?: string | null;

// DEPOIS:
dadosPedidoDeCobranca?: string | null;
importado?: boolean | null;
```

> Usar `boolean | null` mantém consistência com os demais campos opcionais da interface.

---

## Camada 2 — Mongoose Model (Schema)

**Arquivo:** `src/features/pedidos/infra/models/pedido.mongoose.model.ts`

Adicionar o campo no `pedidoSchema`:

```typescript
// ANTES (último campo do schema, linha ~58):
turno: { type: String, default: '' },

// DEPOIS:
turno: { type: String, default: '' },
importado: { type: Boolean, default: false },
```

> O `default: false` garante que documentos existentes (criados antes desta alteração) se comportem como não importados ao serem filtrados.

---

## Camada 3 — Repository Interface

**Arquivo:** `src/features/pedidos/domain/repositories/pedido.repository.interface.ts`

Adicionar o parâmetro `importado` no método `findAll`:

```typescript
// ANTES:
findAll(month?: number, year?: number, day?: number, codigoTecnico?: string): Promise<IPedido[]>;

// DEPOIS:
findAll(month?: number, year?: number, day?: number, codigoTecnico?: string, importado?: boolean): Promise<IPedido[]>;
```

---

## Camada 4 — Repository Implementation

**Arquivo:** `src/features/pedidos/infra/repositories/pedido.mongoose.repository.ts`

**4a. Adicionar `importado` no método `toEntity`:**

```typescript
// ANTES (final do objeto retornado, linha ~26):
dadosPedidoDeCobranca: doc.dadosPedidoDeCobranca,

// DEPOIS:
dadosPedidoDeCobranca: doc.dadosPedidoDeCobranca,
importado: doc.importado,
```

**4b. Adicionar o parâmetro e filtro no método `findAll`:**

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

## Camada 5 — Controller

**Arquivo:** `src/features/pedidos/presentation/pedidos.controller.ts`

**5a. Ler e repassar o parâmetro `importado` no `GET /pedido`:**

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

**5b. PATCH já existe — verificar se está funcional:**

O `PATCH /pedido/:id` já existe no controller (linha 99) e repassa `req.body` diretamente ao `repo.update()`. Como o `update()` usa `findByIdAndUpdate` com os dados parciais, **não é necessária nenhuma alteração** — basta o campo existir no schema. O Delphi enviará:

```json
{ "importado": true }
```

E o MongoDB atualizará somente esse campo.

---

## Resumo das Alterações por Feature

O mesmo padrão das 5 camadas acima se aplica a cada feature. Segue o mapeamento de arquivos:

### Pendências
- `src/features/pendencias/domain/entities/pendencia.entity.ts`
- `src/features/pendencias/infra/models/pendencia.mongoose.model.ts`
- `src/features/pendencias/domain/repositories/pendencia.repository.interface.ts`
- `src/features/pendencias/infra/repositories/pendencia.mongoose.repository.ts`
- `src/features/pendencias/presentation/pendencias.controller.ts`

### Checklist Assistência (Água Gelada)
- `src/features/checklist-assistencia/domain/entities/checklist-assistencia.entity.ts`
- `src/features/checklist-assistencia/infra/models/checklist-assistencia.mongoose.model.ts`
- `src/features/checklist-assistencia/domain/repositories/checklist-assistencia.repository.interface.ts`
- `src/features/checklist-assistencia/infra/repositories/checklist-assistencia.mongoose.repository.ts`
- `src/features/checklist-assistencia/presentation/checklist-assistencia.controller.ts`

### Checklist Assistência Água Natural
- `src/features/checklist-assistencia-agua-natural/domain/entities/checklist-assistencia-agua-natural.entity.ts`
- `src/features/checklist-assistencia-agua-natural/infra/models/checklist-assistencia-agua-natural.mongoose.model.ts`
- `src/features/checklist-assistencia-agua-natural/domain/repositories/checklist-assistencia-agua-natural.repository.interface.ts`
- `src/features/checklist-assistencia-agua-natural/infra/repositories/checklist-assistencia-agua-natural.mongoose.repository.ts`
- `src/features/checklist-assistencia-agua-natural/presentation/checklist-assistencia-agua-natural.controller.ts`

### Produtos Entregue
- `src/features/produtos-entregue/domain/entities/produtos-entregue.entity.ts`
- `src/features/produtos-entregue/infra/models/produtos-entregue.mongoose.model.ts`
- `src/features/produtos-entregue/domain/repositories/produtos-entregue.repository.interface.ts`
- `src/features/produtos-entregue/infra/repositories/produtos-entregue.mongoose.repository.ts`
- `src/features/produtos-entregue/presentation/produtos-entregue.controller.ts`

### Produtos Recebido
- `src/features/produtos-recebido/domain/entities/produtos-recebido.entity.ts`
- `src/features/produtos-recebido/infra/models/produtos-recebido.mongoose.model.ts`
- `src/features/produtos-recebido/domain/repositories/produtos-recebido.repository.interface.ts`
- `src/features/produtos-recebido/infra/repositories/produtos-recebido.mongoose.repository.ts`
- `src/features/produtos-recebido/presentation/produtos-recebido.controller.ts`

---

## Checklist de Implementação

### Pedidos
- [ ] Adicionar `importado?: boolean | null` em `pedido.entity.ts`
- [ ] Adicionar `importado: { type: Boolean, default: false }` em `pedido.mongoose.model.ts`
- [ ] Adicionar parâmetro `importado?: boolean` em `pedido.repository.interface.ts`
- [ ] Adicionar filtro e campo no `toEntity` em `pedido.mongoose.repository.ts`
- [ ] Ler query param `importado` e repassar ao `findAll` em `pedidos.controller.ts`

### Pendências
- [ ] `pendencia.entity.ts`
- [ ] `pendencia.mongoose.model.ts`
- [ ] `pendencia.repository.interface.ts`
- [ ] `pendencia.mongoose.repository.ts`
- [ ] `pendencias.controller.ts`

### Checklist Assistência
- [ ] `checklist-assistencia.entity.ts`
- [ ] `checklist-assistencia.mongoose.model.ts`
- [ ] `checklist-assistencia.repository.interface.ts`
- [ ] `checklist-assistencia.mongoose.repository.ts`
- [ ] `checklist-assistencia.controller.ts`

### Checklist Água Natural
- [ ] `checklist-assistencia-agua-natural.entity.ts`
- [ ] `checklist-assistencia-agua-natural.mongoose.model.ts`
- [ ] `checklist-assistencia-agua-natural.repository.interface.ts`
- [ ] `checklist-assistencia-agua-natural.mongoose.repository.ts`
- [ ] `checklist-assistencia-agua-natural.controller.ts`

### Produtos Entregue
- [ ] `produtos-entregue.entity.ts`
- [ ] `produtos-entregue.mongoose.model.ts`
- [ ] `produtos-entregue.repository.interface.ts`
- [ ] `produtos-entregue.mongoose.repository.ts`
- [ ] `produtos-entregue.controller.ts`

### Produtos Recebido
- [ ] `produtos-recebido.entity.ts`
- [ ] `produtos-recebido.mongoose.model.ts`
- [ ] `produtos-recebido.repository.interface.ts`
- [ ] `produtos-recebido.mongoose.repository.ts`
- [ ] `produtos-recebido.controller.ts`
