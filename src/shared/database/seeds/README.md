# Seeds

Scripts para popular o banco de dados com dados iniciais via API REST.

## Pré-requisito

O servidor deve estar rodando antes de executar qualquer seed.

```bash
npm run start:dev
```

## Execução

A partir da raiz do projeto:

```bash
# Funcionários (60 registros)
node src/shared/database/seeds/seed-funcionarios.js

# Motivos de Retorno (17 registros)
node src/shared/database/seeds/seed-motivos-retorno.js

# Motivos de Situação (5 registros)
node src/shared/database/seeds/seed-motivos-situacao.js
```

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
