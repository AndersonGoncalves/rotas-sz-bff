# Swagger — Documentação da API

## Acesso

Com o servidor rodando, acesse a documentação interativa pelo navegador:

| Ambiente  | URL                              |
|-----------|----------------------------------|
| Produção  | http://54.87.117.64:3001/docs    |
| Local     | http://localhost:3001/docs       |

O JSON bruto da especificação OpenAPI também está disponível em:

| Ambiente  | URL                                   |
|-----------|---------------------------------------|
| Produção  | http://54.87.117.64:3001/swagger.json |
| Local     | http://localhost:3001/swagger.json    |

## Rotas registradas

- `GET /docs` — interface visual do Swagger UI
- `GET /swagger.json` — especificação OpenAPI em JSON

## Implementação

O Swagger é servido diretamente pelo restify via [swagger.controller.ts](swagger.controller.ts), sem dependência de pacotes externos em runtime. A especificação é gerada em [swagger.spec.ts](swagger.spec.ts).

## Porta padrão

A porta é configurada pela variável de ambiente `SERVER_PORT` (padrão: `3001`).
Se o servidor estiver rodando em outra porta, substitua `:3001` pela porta correta na URL.
