## Seeds de Banco de Dados

Scripts para importar dados do Firebase Realtime Database para o MongoDB via API REST.  
Os arquivos JSON exportados do Firebase ficam na pasta `dados/`.

**Pré-requisito:** o servidor deve estar rodando antes de executar qualquer seed.

---

## Fonte dos dados

O Firebase exporta um objeto com os IDs como chaves — o mesmo valor está dentro do objeto em `id`:

```json
{
  "976858": { "id": "976858", "nomeCliente": "...", ... },
  "977184": { "id": "977184", "nomeCliente": "...", ... }
}
```

Os scripts leem o JSON, extraem os objetos e os enviam para a API usando o `id` já existente — sem gerar ou incrementar IDs.

---

## Arquivos de dados esperados

| Arquivo (dentro de `dados/`) | Seed | Endpoint |
| ---------------------------- | ---- | -------- |
| `rotas-sz-default-rtdb-pedido-export.json` | `seed-pedidos.js` | `PUT /pedido/:id` |
| `rotas-sz-default-rtdb-produtos_entregue-export.json` | `seed-produtos-entregue.js` | `POST /produtos-entregue` |
| `rotas-sz-default-rtdb-produtos_recebido-export.json` | `seed-produtos-recebido.js` | `POST /produtos-recebido` |
| `rotas-sz-default-rtdb-pendencia-export.json` | `seed-pendencias.js` | `POST /pendencias` |
| `rotas-sz-default-rtdb-checklist_assistencia-export.json` | `seed-checklist-assistencia.js` | `POST /checklist-assistencia` |
| `rotas-sz-default-rtdb-checklist_assistencia_agua_natural-export.json` | `seed-checklist-assistencia-agua-natural.js` | `POST /checklist-assistencia-agua-natural` |
| `rotas-sz-default-rtdb-funcionarios-export.json` | `seed-funcionarios.js` | `POST /funcionarios` |
| `rotas-sz-default-rtdb-motivos_retorno-export.json` | `seed-motivos-retorno.js` | `POST /motivos-retorno` |
| `rotas-sz-default-rtdb-motivos_situacao-export.json` | `seed-motivos-situacao.js` | `POST /motivos-situacao` |

---

## seed-all.js — rodar todos de uma vez

```
node seed-all.js [data] [url]
```

| Combinação | Comando |
| ---------- | ------- |
| Sem data, API local | `node seed-all.js` |
| Com data, API local | `node seed-all.js 2026-06-24` |
| Sem data, API remota | `node seed-all.js "" http://192.168.1.100:3001` |
| Com data, API remota | `node seed-all.js 2026-06-24 http://192.168.1.100:3001` |

> Para passar apenas a URL sem data, use `""` como primeiro argumento (string vazia).

---

## Seeds individuais

### Com suporte a data

```
node <seed> [data] [url]
```

A data sobrescreve `dataRomaneio` e `dataVisita`. Se omitida, usa a data que já está no JSON.

| Seed | API local, sem data | API local, com data | API remota, com data |
| ---- | ------------------- | ------------------- | -------------------- |
| `seed-pedidos.js` | `node seed-pedidos.js` | `node seed-pedidos.js 2026-06-24` | `node seed-pedidos.js 2026-06-24 http://host:3001` |
| `seed-produtos-entregue.js` | `node seed-produtos-entregue.js` | `node seed-produtos-entregue.js 2026-06-24` | `node seed-produtos-entregue.js 2026-06-24 http://host:3001` |
| `seed-produtos-recebido.js` | `node seed-produtos-recebido.js` | `node seed-produtos-recebido.js 2026-06-24` | `node seed-produtos-recebido.js 2026-06-24 http://host:3001` |

> Esses seeds verificam a API antes de inserir e **abortam** se já existirem registros com a mesma `dataRomaneio`.

### Sem suporte a data

```
node <seed> [url]
```

| Seed | API local | API remota |
| ---- | --------- | ---------- |
| `seed-pendencias.js` | `node seed-pendencias.js` | `node seed-pendencias.js http://host:3001` |
| `seed-checklist-assistencia.js` | `node seed-checklist-assistencia.js` | `node seed-checklist-assistencia.js http://host:3001` |
| `seed-checklist-assistencia-agua-natural.js` | `node seed-checklist-assistencia-agua-natural.js` | `node seed-checklist-assistencia-agua-natural.js http://host:3001` |
| `seed-funcionarios.js` | `node seed-funcionarios.js` | `node seed-funcionarios.js http://host:3001` |
| `seed-motivos-retorno.js` | `node seed-motivos-retorno.js` | `node seed-motivos-retorno.js http://host:3001` |
| `seed-motivos-situacao.js` | `node seed-motivos-situacao.js` | `node seed-motivos-situacao.js http://host:3001` |

---

## Observações

- Todos os scripts enviam as requisições em paralelo.
- Cada linha do terminal mostra `✓` (sucesso) ou `✗` (erro) com status HTTP para cada registro.
- A URL padrão é `http://localhost:3001`. Passe outra URL para apontar para um servidor remoto.
