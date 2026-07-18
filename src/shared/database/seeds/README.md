## Seeds de Banco de Dados

Scripts para importar dados do Firebase Realtime Database para o MongoDB via API REST.
Os arquivos JSON exportados do Firebase ficam na pasta `dados/`.

**Pré-requisito:** o servidor deve estar rodando em `http://localhost:3001` antes de executar qualquer seed.

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

## Rodar tudo de uma vez

```bash
node seed-all.js
```

---

## Rodar um por um (copiar e colar)

Execute a partir desta pasta (`src/shared/database/seeds`), na ordem abaixo.

```bash
node seed-pedidos.js
```

```bash
node seed-produtos-entregue.js
```

```bash
node seed-produtos-recebido.js
```

```bash
node seed-pendencias.js
```

```bash
node seed-checklist-assistencia.js
```

```bash
node seed-checklist-assistencia-agua-natural.js
```

```bash
node seed-funcionarios.js
```

```bash
node seed-motivos-retorno.js
```

```bash
node seed-motivos-situacao.js
```

---

## Referência de endpoints

| Arquivo (dentro de `dados/`)                                           | Seed                                         | Endpoint                                   |
| ---------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------ |
| `rotas-sz-default-rtdb-pedido-export.json`                             | `seed-pedidos.js`                            | `PUT /pedido/:id`                          |
| `rotas-sz-default-rtdb-produtos_entregue-export.json`                  | `seed-produtos-entregue.js`                  | `POST /produtos_entregue`                  |
| `rotas-sz-default-rtdb-produtos_recebido-export.json`                  | `seed-produtos-recebido.js`                  | `POST /produtos_recebido`                  |
| `rotas-sz-default-rtdb-pendencia-export.json`                          | `seed-pendencias.js`                         | `POST /pendencia`                          |
| `rotas-sz-default-rtdb-checklist_assistencia-export.json`              | `seed-checklist-assistencia.js`              | `POST /checklist_assistencia`              |
| `rotas-sz-default-rtdb-checklist_assistencia_agua_natural-export.json` | `seed-checklist-assistencia-agua-natural.js` | `POST /checklist_assistencia_agua_natural` |
| `rotas-sz-default-rtdb-funcionarios-export.json`                       | `seed-funcionarios.js`                       | `POST /funcionarios`                       |
| `rotas-sz-default-rtdb-motivos_retorno-export.json`                    | `seed-motivos-retorno.js`                    | `POST /motivos-retorno`                    |
| `rotas-sz-default-rtdb-motivos_situacao-export.json`                   | `seed-motivos-situacao.js`                   | `POST /motivos-situacao`                   |

---

## Opções avançadas (data e URL remota)

Por padrão, todo comando acima aponta para `http://localhost:3001` e usa as datas já presentes no JSON. Para customizar:

```
node seed-all.js [data] [url]
node <seed-com-data> [data] [url]
node <seed-sem-data> [url]
```

- `seed-pedidos.js`, `seed-produtos-entregue.js` e `seed-produtos-recebido.js` aceitam `data` (sobrescreve `dataRomaneio`/`dataVisita`) como primeiro argumento, e **abortam** se já existirem registros com a mesma `dataRomaneio`.
- Os demais seeds não têm argumento de data; o primeiro argumento já é a URL.
- Para passar só a URL em `seed-all.js` ou nos seeds com data, use `""` como primeiro argumento (data vazia).

Exemplos:

```bash
node seed-all.js 2026-06-24
node seed-all.js "" http://192.168.1.100:3001
node seed-pedidos.js 2026-06-24 http://192.168.1.100:3001
node seed-funcionarios.js
```

---

## Observações

- Todos os scripts enviam as requisições em paralelo.
- Cada linha do terminal mostra `✓` (sucesso) ou `✗` (erro) com status HTTP para cada registro.
- A URL padrão é `http://localhost:3001`. Passe outra URL para apontar para um servidor remoto.

## Quando for iniciar o banco (rodar um script de cada vez)

- Base SZ

```
node seed-funcionarios http://3.218.168.154:3001
node seed-motivos-situacao http://3.218.168.154:3001
node seed-motivos-retorno http://3.218.168.154:3001
node seed-checklist-assistencia-agua-natural http://3.218.168.154:3001
node seed-checklist-assistencia http://3.218.168.154:3001
node seed-pedidos http://3.218.168.154:3001
node seed-pendencias http://3.218.168.154:3001
node seed-produtos-entregue http://3.218.168.154:3001
node seed-produtos-recebido http://3.218.168.154:3001
```

- Base Anderson

```
node seed-funcionarios http://54.87.117.64:3001
node seed-motivos-situacao http://54.87.117.64:3001
node seed-motivos-retorno http://54.87.117.64:3001
node seed-checklist-assistencia-agua-natural http://54.87.117.64:3001
node seed-checklist-assistencia http://54.87.117.64:3001
node seed-pedidos http://54.87.117.64:3001
node seed-pendencias http://54.87.117.64:3001
node seed-produtos-entregue http://54.87.117.64:3001
node seed-produtos-recebido http://54.87.117.64:3001
```
