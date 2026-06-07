# Debug local com Docker

## Pré-requisitos

- Docker instalado (`docker --version`)
- VS Code com a extensão **Node.js Debugger** (já nativa)

---

## Passo a passo

### 1. Build da imagem

Sempre que alterar código, rebuilde a imagem antes de subir:

```bash
docker compose build api
```

### 2. Subir os containers com debug habilitado

```bash
docker compose -f docker-compose.yml -f docker-compose.debug.yml up
```

Aguarde até ver no terminal:

```
api-1  | Debugger listening on ws://0.0.0.0:9229/...
api-1  | [Server] rotas-sz-bff rodando na porta 3001
```

### 3. Conectar o VS Code ao debugger

1. Abra o painel **Run & Debug** (`Ctrl+Shift+D`)
2. Selecione a configuração **"Debug via ts-node-dev (attach)"**
3. Clique em **Start Debugging** (ou pressione `F5`)

Os breakpoints nos arquivos `.ts` passam a funcionar normalmente.

---

## Parar os containers

```bash
docker compose down
```

---

## Observações

- O arquivo `docker-compose.debug.yml` apenas adiciona `--inspect=0.0.0.0:9229` ao comando de start e expõe a porta `9229`.
- Os source maps são gerados pelo TypeScript (`sourceMap: true` no `tsconfig.json`), por isso os breakpoints funcionam nos arquivos `.ts` mesmo que o container rode o `.js` compilado.
- O aviso do MongoDB `Connection not authenticated` que aparece no log é informativo e não afeta o funcionamento.
