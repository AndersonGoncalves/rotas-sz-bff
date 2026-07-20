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

// OR + AND juntos: campos no nível raiz do find já são combinados com AND junto ao $or
// Ex.: (dataRomaneio = X OU dataRomaneio = Y) E codigoTecnico = '886'
db.getCollection("pedido").find({
  $or: [
    { dataRomaneio: '2026-07-20T00:00:00.000' },
    { dataRomaneio: '2026-07-20T00:00:00' }
  ],
  codigoTecnico: '886'
})

// Mesmo resultado, com $and explícito (útil quando precisa combinar vários $or/$and)
db.getCollection("pedido").find({
  $and: [
    { $or: [{ dataRomaneio: '2026-07-20T00:00:00.000' }, { dataRomaneio: '2026-07-20T00:00:00' }] },
    { codigoTecnico: '886' }
  ]
})

// Atenção: chaves repetidas no mesmo objeto são inválidas (a segunda sobrescreve a primeira)
// ERRADO: { dataRomaneio: 'A', dataRomaneio: 'B' }  -> só 'B' é considerado
// CERTO: usar $or com um objeto por condição, como no exemplo acima

// Maior / menor
db.getCollection("pedido").find({ quantidade: { $gt: 10 } })           // >
db.getCollection("pedido").find({ quantidade: { $gte: 10 } })          // >=
db.getCollection("pedido").find({ quantidade: { $lt: 10 } })           // <
db.getCollection("pedido").find({ quantidade: { $lte: 10 } })          // <=

// Entre dois valores (range)
db.getCollection("pedido").find({ dataRomaneio: { $gte: '2026-07-01T00:00:00.000', $lte: '2026-07-31T23:59:59.999' } })

// Diferente
db.getCollection("pedido").find({ status: { $ne: "cancelado" } })

// Está / não está em uma lista de valores (IN / NOT IN)
db.getCollection("pedido").find({ codigoTecnico: { $in: ['886', '123', '456'] } })
db.getCollection("pedido").find({ status: { $nin: ["cancelado", "excluido"] } })

// Campo existe / não existe
db.getCollection("pedido").find({ observacao: { $exists: true } })
db.getCollection("pedido").find({ observacao: { $exists: false } })

// Campo é null (existe mas valor é null) vs campo não existe
db.getCollection("pedido").find({ observacao: null }) // pega null OU inexistente
db.getCollection("pedido").find({ observacao: { $eq: null, $exists: true } }) // só null

// Contém texto (like)
db.getCollection("pedido").find({ nome: { $regex: "texto", $options: "i" } })

// Começa com / termina com
db.getCollection("pedido").find({ nome: { $regex: "^Pedido", $options: "i" } })
db.getCollection("pedido").find({ nome: { $regex: "encerrado$", $options: "i" } })

// Negar uma condição
db.getCollection("pedido").find({ status: { $not: { $eq: "aberto" } } })

// Consultar dentro de array: elemento que satisfaz múltiplas condições
db.getCollection("pedido").find({ itens: { $elemMatch: { produto: "X", quantidade: { $gte: 2 } } } })

// Array contém todos os valores listados
db.getCollection("pedido").find({ tags: { $all: ["urgente", "revisado"] } })

// Tamanho do array
db.getCollection("pedido").find({ itens: { $size: 3 } })

// Consultar campo dentro de subdocumento (dot notation)
db.getCollection("pedido").find({ "endereco.cidade": "São Paulo" })
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

## DISTINCT (valores únicos)

```js
// Valores únicos de um campo (com ou sem filtro)
db.getCollection("pedido").distinct("status")
db.getCollection("pedido").distinct("codigoTecnico", { status: "aberto" })
```

## GROUP BY / agregação (aggregate)

```js
// Contar pedidos por status
db.getCollection("pedido").aggregate([
  { $match: { importado: true } },        // WHERE
  { $group: { _id: "$status", total: { $sum: 1 } } }, // GROUP BY + COUNT
  { $sort: { total: -1 } }                 // ORDER BY
])

// Somar quantidade por técnico
db.getCollection("pedido").aggregate([
  { $group: { _id: "$codigoTecnico", quantidadeTotal: { $sum: "$quantidade" } } }
])
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
