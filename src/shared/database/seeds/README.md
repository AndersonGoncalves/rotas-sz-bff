## Seeds de Banco de Dados

Scripts para popular o banco com dados iniciais. Execute com o servidor em execução (`http://localhost:3001`).

### Seed Completo (pedidos + produtos entregues + produtos recebidos)

Executa os três seeds em sequência com a mesma data. Se qualquer um abortar (ex.: data já existente), os demais não são executados.

```bash
npm run seed -- 2026-05-30
```

Ou diretamente:

```bash
node src/shared/database/seeds/seed-all.js 2026-05-30
```

### Funcionários

```bash
node src/shared/database/seeds/seed-funcionarios.js
```

### Motivos de Retorno

```bash
node src/shared/database/seeds/seed-motivos-retorno.js
```

### Motivos de Situação

```bash
node src/shared/database/seeds/seed-motivos-situacao.js
```

### Pedidos

Requer a data do romaneio no formato `YYYY-MM-DD`. O ID inicial é determinado automaticamente consultando o maior `id` já existente na coleção e incrementando. A data é aplicada nos campos `dataRomaneio` e `dataVisita` de todos os pedidos.

```bash
node src/shared/database/seeds/seed-pedidos.js <data>
# Exemplo:
node src/shared/database/seeds/seed-pedidos.js 2026-05-30
```

### Pendências

```bash
node src/shared/database/seeds/seed-pendencias.js
```

### Produtos Entregues

Requer a data do romaneio no formato `YYYY-MM-DD`. O ID inicial é determinado automaticamente consultando o maior `id` já existente na coleção e incrementando. A data é aplicada no campo `dataRomaneio` de todos os registros.

```bash
node src/shared/database/seeds/seed-produtos-entregue.js <data>
# Exemplo:
node src/shared/database/seeds/seed-produtos-entregue.js 2026-05-30
```

### Produtos Recebidos

Requer a data do romaneio no formato `YYYY-MM-DD`. O ID inicial é determinado automaticamente consultando o maior `id` já existente na coleção e incrementando. A data é aplicada no campo `dataRomaneio` de todos os registros.

```bash
node src/shared/database/seeds/seed-produtos-recebido.js <data>
# Exemplo:
node src/shared/database/seeds/seed-produtos-recebido.js 2026-05-30
```

### Checklist de Assistência

```bash
node src/shared/database/seeds/seed-checklist-assistencia.js
```

### Checklist de Assistência — Água Natural

```bash
node src/shared/database/seeds/seed-checklist-assistencia-agua-natural.js
```

---

## Endpoints utilizados

| Script                    | Endpoint                        |
|---------------------------|---------------------------------|
| seed-funcionarios.js      | POST /funcionarios              |
| seed-motivos-retorno.js   | POST /motivos-retorno           |
| seed-motivos-situacao.js  | POST /motivos-situacao          |

## Observações

- Os scripts enviam todas as requisições em paralelo.
- Cada linha do terminal mostra `✓` (sucesso) ou `✗` (erro) para cada registro.
- Registros com `id` vazio no Firebase foram mantidos com a chave do nó como identificador.
