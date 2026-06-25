# Comandos MongoDB — Collections

## Listar

```js
// Todos os documentos
db.getCollection("pedido").find({})

// Limitar quantidade
db.getCollection("pedido").find({}).limit(10)

// Contar documentos
db.getCollection("pedido").countDocuments({})
```

## WHERE (filtros)

```js
// Igual
db.getCollection("pedido").find({ status: "aberto" })

// Múltiplas condições (AND)
db.getCollection("pedido").find({ status: "aberto", importado: true })

// OR
db.getCollection("pedido").find({ $or: [{ status: "aberto" }, { status: "pendente" }] })

// Maior / menor
db.getCollection("pedido").find({ quantidade: { $gt: 10 } })           // >
db.getCollection("pedido").find({ quantidade: { $gte: 10 } })          // >=
db.getCollection("pedido").find({ quantidade: { $lt: 10 } })           // <
db.getCollection("pedido").find({ quantidade: { $lte: 10 } })          // <=

// Diferente
db.getCollection("pedido").find({ status: { $ne: "cancelado" } })

// Campo existe
db.getCollection("pedido").find({ observacao: { $exists: true } })

// Contém texto (like)
db.getCollection("pedido").find({ nome: { $regex: "texto", $options: "i" } })
```

## ORDER BY (ordenação)

```js
// Crescente (1) / Decrescente (-1)
db.getCollection("pedido").find({}).sort({ dataCriacao: -1 })
db.getCollection("pedido").find({}).sort({ nome: 1 })

// Ordenar + limitar
db.getCollection("pedido").find({}).sort({ dataCriacao: -1 }).limit(10)
```

## SELECT (projeção de campos)

```js
// Retornar apenas campos específicos (1 = inclui, 0 = exclui)
db.getCollection("pedido").find({}, { nome: 1, status: 1, _id: 0 })
```

## INSERT

```js
// Inserir um documento
db.getCollection("pedido").insertOne({ nome: "Pedido 1", status: "aberto", importado: false })

// Inserir vários documentos
db.getCollection("pedido").insertMany([
  { nome: "Pedido 1", status: "aberto" },
  { nome: "Pedido 2", status: "pendente" }
])
```

## UPDATE

```js
// Atualizar um campo em um documento
db.getCollection("pedido").updateOne(
  { _id: ObjectId("...") },
  { $set: { status: "fechado" } }
)

// Atualizar campo em vários documentos (sem filtro = todos)
db.getCollection("pedido").updateMany({}, { $set: { importado: true } })

// Atualizar com filtro
db.getCollection("pedido").updateMany({ status: "aberto" }, { $set: { importado: false } })

// Incrementar valor numérico
db.getCollection("pedido").updateOne(
  { _id: ObjectId("...") },
  { $inc: { quantidade: 1 } }
)

// Remover um campo
db.getCollection("pedido").updateMany({}, { $unset: { campoAntigo: "" } })
```

## DELETE

```js
// Deletar um documento
db.getCollection("pedido").deleteOne({ _id: ObjectId("...") })

// Deletar com filtro
db.getCollection("pedido").deleteMany({ status: "cancelado" })

// Deletar todos os documentos da collection
db.getCollection("pedido").deleteMany({})
```

## Comandos por collection do projeto

```js
// Limpar collections
db.getCollection("checklist_assistencia").deleteMany({})
db.getCollection("checklist_assistencia_agua_natural").deleteMany({})
db.getCollection("funcionario").deleteMany({})
db.getCollection("motivoRetorno").deleteMany({})
db.getCollection("motivoSituacao").deleteMany({})
db.getCollection("pedido").deleteMany({})
db.getCollection("pendencia").deleteMany({})
db.getCollection("produtos_entregue").deleteMany({})
db.getCollection("produtos_recebido").deleteMany({})

// Marcar todos os pedidos como importado
db.getCollection("pedido").updateMany({}, { $set: { importado: true } })
```
