# MongoDB — Criação de Índices

Nenhuma collection do projeto tem índice além dos `unique` em `usuario.email` e `titulo.tpgCodigo`. Todo `find()` com filtro hoje faz *collection scan* (varre a collection inteira). Este doc lista os índices recomendados, com base nos filtros/ordenações usados pelos repositórios (`src/features/*/infra/repositories/*.mongoose.repository.ts`).

## Como criar

Dois jeitos válidos — escolha um e mantenha consistência:

**1. Via shell/Compass** (aplica direto no banco, não fica versionado no código):
```js
db.getCollection("pedido").createIndex({ codigoTecnico: 1, importado: 1, dataRomaneio: -1 })
```

**2. Via Mongoose, no arquivo do schema** (recomendado — fica versionado e é criado automaticamente ao subir a app, já que `autoIndex` é `true` fora de produção):
```js
// pedido.mongoose.model.ts
pedidoSchema.index({ codigoTecnico: 1, importado: 1, dataRomaneio: -1 });
```

Em produção, `autoIndex` costuma ser desligado por segurança/performance — nesse caso os índices declarados no schema não são criados automaticamente; rode a criação manualmente (shell, script de migração, ou `Model.syncIndexes()`).

## Conferir se um índice está sendo usado

```js
db.getCollection("pedido").find({ codigoTecnico: "123" }).explain("executionStats")
// procure "IXSCAN" (usando índice) vs "COLLSCAN" (varredura completa, ruim)
```

Ver índices existentes numa collection:
```js
db.getCollection("pedido").getIndexes()
```

---

## Índices recomendados por collection

### `pedido`
Filtros usados em [pedido.mongoose.repository.ts](../src/features/pedidos/infra/repositories/pedido.mongoose.repository.ts): `codigoTecnico`, `importado`, range de `dataRomaneio`, sempre ordenado por `dataRomaneio` desc.

```js
db.getCollection("pedido").createIndex({ codigoTecnico: 1, importado: 1, dataRomaneio: -1 })
```

> Nota sobre `idCliente`: o pedido guarda tanto `idCliente` (string solta) quanto `cliente` (objeto `Mixed` com os dados completos do cliente já embutidos). Como o dado do cliente já vem embutido no próprio pedido, não há necessidade de `$lookup`/`populate` para leitura — `idCliente` só precisa de índice se for usado como filtro de busca (ex: "todos os pedidos de um cliente"). Se esse uso existir, criar:
```js
db.getCollection("pedido").createIndex({ idCliente: 1 })
```

### `produtos_entregue`, `produtos_recebido`, `pendencia`, `checklist_assistencia`, `checklist_assistencia_agua_natural`
Mesmo padrão em todas: filtram por `importado` e ordenam por `dataRomaneio` (ou `dataChecklist`) desc.

```js
db.getCollection("produtos_entregue").createIndex({ importado: 1, dataRomaneio: -1 })
db.getCollection("produtos_recebido").createIndex({ importado: 1, dataRomaneio: -1 })
db.getCollection("pendencia").createIndex({ importado: 1, dataRomaneio: -1 })
db.getCollection("checklist_assistencia").createIndex({ importado: 1, dataChecklist: -1 })
db.getCollection("checklist_assistencia_agua_natural").createIndex({ importado: 1, dataChecklist: -1 })
```

Como `importado: false` normalmente é o subconjunto pequeno (itens pendentes de importação — o caso mais consultado), considerar índice **parcial** só nesse subconjunto, mais leve que indexar a collection inteira:
```js
db.getCollection("produtos_entregue").createIndex(
  { dataRomaneio: -1 },
  { partialFilterExpression: { importado: { $ne: true } } }
)
```

### `titulo`
Filtra por range de `dataVencimento` ([titulo.mongoose.repository.ts:15](../src/features/titulos/infra/repositories/titulo.mongoose.repository.ts#L15)).

```js
db.getCollection("titulo").createIndex({ dataVencimento: 1 })
```

### `cliente`, `funcionario`, `motivoRetorno`, `motivoSituacao`
Ordenam por `nome`/`descricao` sem filtro. Baixa prioridade (tabelas pequenas de referência), mas evita *sort* em memória se crescerem:
```js
db.getCollection("cliente").createIndex({ nome: 1 })
db.getCollection("funcionario").createIndex({ nome: 1 })
db.getCollection("motivoRetorno").createIndex({ descricao: 1 })
db.getCollection("motivoSituacao").createIndex({ descricao: 1 })
```

---

## Outros pontos de atenção (não são índice, mas afetam performance/consistência)

- **Datas como `String` em vez de `Date`**: `dataRomaneio`, `dataChecklist`, `dataVencimento` são `String` no schema. Hoje funciona porque o formato é ISO com zero-padding (ordena bem lexicograficamente), mas é frágil — qualquer inconsistência de formatação quebra `$gte`/`$lt` silenciosamente. Migrar para `Date` nativo é mais seguro e permite operadores de agregação de data.
- **Regex sem âncora** (`$regex: "texto"`, sem `^`) não usa índice de forma eficiente mesmo com índice criado no campo — gera *collection scan* parcial. Prefira `^texto` quando a busca for por prefixo.
