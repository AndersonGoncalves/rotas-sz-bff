# Guia de Debug — rotas-sz-bff

Este guia cobre todo o processo: configurar o ambiente, rodar o servidor, depurar com breakpoints no VSCode e testar os endpoints com Hoppscotch (ou pelo navegador).

---

## Resumo: estado atual e o que fazer para debugar agora

### O que já está pronto

| Item | Status | Detalhe |
|---|---|---|
| Node.js v20 | ✅ instalado | `node -v` → v20.19.5 |
| MongoDB v7 | ✅ instalado e rodando | `systemctl status mongod` → active |
| `ts-node` e `ts-node-dev` | ✅ em `node_modules` | instalados via `npm install` |
| Arquivo `.env` | ✅ configurado | `SERVER_PORT=3001`, `DB_URL=mongodb://localhost:27017/rotas-sz` |
| `tsconfig.json` com `sourceMap` | ✅ habilitado | permite breakpoints direto nos arquivos `.ts` |
| `.vscode/launch.json` | ✅ configurado | adicionadas as configs **"Debug rotas-sz-bff"** e **"Debug via ts-node-dev (attach)"** |
| Coleção Hoppscotch | ✅ pronta | `collections/hoppscotch-collection.json` com todos os endpoints |

### O que você precisa fazer (3 passos)

**Passo 1 — Abra o Hoppscotch e importe a coleção**

Acesse [hoppscotch.io](https://hoppscotch.io) no navegador, vá em **Collections → Import → Import from JSON** e selecione o arquivo `collections/hoppscotch-collection.json`. Faça isso uma vez; a coleção fica salva.

**Passo 2 — Inicie o servidor em modo debug no VSCode**

1. Abra a aba **Run and Debug** (`Ctrl+Shift+D`).
2. Selecione **"Debug rotas-sz-bff"** no dropdown.
3. Pressione `F5` — o VSCode sobe o servidor por conta própria.

Saída esperada no terminal do VSCode:
```
[DB] Conectado ao MongoDB: mongodb://localhost:27017/rotas-sz
[Server] rotas-sz-bff rodando na porta 3001
```

> **Não rode `npm run dev` antes do F5** nesta opção — o VSCode sobe o processo. Se quiser hot-reload, use a Opção 2 da seção 5 (`npm run dev:debug` + attach).

**Passo 3 — Coloque um breakpoint e dispare a requisição**

1. Abra qualquer controller em `src/features/*/presentation/*.controller.ts`.
2. Clique na margem esquerda de uma linha para adicionar o breakpoint (círculo vermelho).
3. No Hoppscotch, execute a requisição correspondente.
4. O VSCode pausará a execução no breakpoint — inspecione variáveis no painel lateral.

> **Alternativa sem debug:** se quiser só testar os endpoints sem breakpoints, rode `npm run dev` no terminal e use o Hoppscotch normalmente.

---

## Pré-requisitos

| Ferramenta | Versão mínima | Verificar |
|---|---|---|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| MongoDB | 6+ (local ou Docker) | `mongod --version` |
| TypeScript | instalado via devDependencies | `npx tsc -v` |

---

## 1. Configurar o ambiente

Copie o arquivo de exemplo e ajuste as variáveis:

```bash
cp .env.example .env
```

Conteúdo padrão do `.env`:

```env
SERVER_PORT=3001
DB_URL=mongodb://localhost:27017/rotas-sz
```

> Se o MongoDB estiver rodando via Docker, mantenha `localhost:27017`.  
> Se usar uma instância remota ou com autenticação, ajuste `DB_URL` conforme necessário.

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Subir o MongoDB

### Opção A — MongoDB local

Certifique-se que o serviço está ativo:

```bash
# Linux
sudo systemctl start mongod

# Verificar status
sudo systemctl status mongod
```

### Opção B — Via Docker

```bash
docker run -d --name mongo-rotas -p 27017:27017 mongo:6
```

---

## 4. Rodar o projeto

### Modo desenvolvimento (com hot-reload)

```bash
npm run dev
```

O comando usa `ts-node-dev`, que recompila e reinicia automaticamente ao salvar qualquer arquivo `.ts`.

Saída esperada no terminal:

```
[DB] Conectado ao MongoDB: mongodb://localhost:27017/rotas-sz
[Server] rotas-sz-bff rodando na porta 3001
```

### Modo produção (build compilado)

```bash
npm run build   # compila TypeScript para dist/
npm start       # executa dist/main.js
```

---

## 5. Debugar com breakpoints no VSCode

O projeto já tem `sourceMap: true` no `tsconfig.json` e o `.vscode/launch.json` versionado com duas configurações prontas — você não precisa editar nada.

### Opção 1 — Lançar pelo VSCode (recomendado)

> **Não rode `npm run dev` antes.** O VSCode sobe o servidor por conta própria. Se o `npm run dev` já estiver rodando, haverá conflito de porta (`EADDRINUSE: 3001`).

1. Abra a aba **Run and Debug** (`Ctrl+Shift+D`).
2. Selecione **"Debug rotas-sz-bff"** no dropdown.
3. Pressione `F5` — o servidor sobe com o debugger ativo.
4. Coloque um breakpoint em qualquer arquivo `.ts` clicando na margem esquerda.
5. Dispare uma requisição pelo Hoppscotch ou navegador; a execução pausará no breakpoint.

Os breakpoints param diretamente no seu código-fonte `.ts`, não nos arquivos compilados de `dist/`.

### Opção 2 — Attach ao ts-node-dev (hot-reload + debug)

Use esta opção quando quiser manter o hot-reload do `ts-node-dev` e debugar ao mesmo tempo.

**Passo 1 — Suba o servidor com a porta de debug aberta:**

```bash
npm run dev:debug
```

Aguarde a saída completa no terminal antes de continuar:

```
[DB] Conectado ao MongoDB: mongodb://localhost:27017/rotas-sz
[Server] rotas-sz-bff rodando na porta 3001
```

> **Importante:** pressionar F5 antes do servidor terminar de subir faz o VS Code tentar conectar na porta 9229 antes dela estar disponível e encerrar a sessão. Espere a linha do servidor aparecer.

**Passo 2 — Anexe o debugger:**

1. Abra a aba **Run and Debug** (`Ctrl+Shift+D`).
2. Selecione **"Debug via ts-node-dev (attach)"** no dropdown.
3. Pressione `F5`.

A sessão permanece ativa mesmo quando o `ts-node-dev` reinicia o processo ao salvar um arquivo (o VS Code reconecta automaticamente graças ao `"restart": true` no `launch.json`).

### Breakpoints úteis para começar

| Arquivo | O que observar |
|---|---|
| [src/shared/http/server.ts](../src/shared/http/server.ts) | Inicialização do servidor e conexão com banco |
| [src/shared/database/mongoose.connection.ts](../src/shared/database/mongoose.connection.ts) | Erros de conexão com MongoDB |
| [src/features/pedidos/presentation/pedidos.controller.ts](../src/features/pedidos/presentation/pedidos.controller.ts) | Entrada das requisições de pedidos |
| [src/features/pedidos/infra/repositories/pedido.mongoose.repository.ts](../src/features/pedidos/infra/repositories/pedido.mongoose.repository.ts) | Queries ao banco |

---

## 6. Testar os endpoints com Hoppscotch (recomendado)

O projeto inclui uma coleção pronta em [collections/hoppscotch-collection.json](../collections/hoppscotch-collection.json) com todos os endpoints pré-configurados.

### Acessar o Hoppscotch

Abra no navegador: **[hoppscotch.io](https://hoppscotch.io)**

> O Hoppscotch é uma ferramenta web gratuita, não requer instalação.

### Importar a coleção

1. No Hoppscotch, clique em **Collections** (ícone de pasta no menu lateral esquerdo).
2. Clique no ícone de **importar** (seta para baixo / três pontos > "Import").
3. Selecione **"Import from JSON"**.
4. Escolha o arquivo `collections/hoppscotch-collection.json`.
5. A coleção **"Rotas SZ BFF"** aparecerá com todas as pastas de recursos.

### Estrutura da coleção

| Pasta | Endpoints disponíveis |
|---|---|
| Clientes | GET all, GET by ID, POST, PATCH, DELETE |
| Checklist Assistência | GET all, GET by ID, POST, PATCH |
| Checklist Assistência Água Natural | GET all, GET by ID, POST, PATCH |
| Funcionários | GET all, GET by ID, POST, PATCH, DELETE |
| Motivos de Retorno | GET all, GET by ID, POST, PATCH, DELETE |
| Motivos de Situação | GET all, GET by ID, POST, PATCH, DELETE |
| Pedidos | GET all, GET por mês/ano, GET by ID, PUT, PATCH, DELETE |
| Pendências | GET all, GET by ID, POST, PATCH, DELETE |
| Produtos Entregue | GET all, GET by ID, POST, PATCH |
| Produtos Recebido | GET all, GET by ID, POST, PATCH |
| Produtos | GET all, GET by ID, POST, PATCH, DELETE |
| Usuários | GET all, GET by ID, POST, PATCH, DELETE |
| Visitas | GET all, GET by ID, POST, PATCH, DELETE |
| Títulos | GET all, GET por mês/ano, GET by ID, POST, PATCH, DELETE |

### Substituir `<<id>>` por IDs reais

Nas requisições que usam `<<id>>`, substitua pelo `_id` retornado em um GET. Exemplo:

1. Execute **"Funcionários > Listar todos"** — copie um `_id` do retorno.
2. Abra **"Funcionários > Buscar por ID"** — substitua `<<id>>` pelo valor copiado.
3. Envie a requisição.

### Filtros disponíveis em Pedidos e Títulos

As requisições **"Listar por mês/ano"** já têm os query params `month` e `year` configurados. Basta alterar os valores diretamente nos campos de parâmetros na aba **"Params"** do Hoppscotch.

---

## 7. Testar via navegador (apenas GET)

Para requisições GET simples, o navegador basta. Com o servidor rodando, acesse:

```
http://localhost:3001/funcionarios
http://localhost:3001/pedidos
http://localhost:3001/pedidos?month=5&year=2024
http://localhost:3001/motivos-retorno
http://localhost:3001/visitas
http://localhost:3001/checklist-assistencia
```

> O navegador só serve para GET. Para POST, PATCH, PUT e DELETE, use o Hoppscotch.

---

## 8. Erros comuns e como resolver

### Servidor não sobe — erro de MongoDB

```
[DB] Erro ao conectar ao MongoDB: MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```

**Causa:** MongoDB não está rodando.  
**Solução:** Inicie o MongoDB (`sudo systemctl start mongod` ou `docker start mongo-rotas`).

---

### Porta já em uso

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Causa:** Outra instância do servidor ou outro processo está usando a porta 3001.  
**Solução:**

```bash
# Descobrir qual processo usa a porta
lsof -i :3001

# Matar o processo (substitua <PID> pelo número retornado)
kill -9 <PID>
```

---

### Erro de compilação TypeScript

```
error TS2345: Argument of type 'X' is not assignable to parameter of type 'Y'
```

**Causa:** Tipo incorreto passado para um método.  
**Solução:** Verifique a entidade ou interface correspondente no diretório `domain/`.

---

### Resposta 404 em um endpoint ativo

**Causa:** O controller pode estar comentado em [main.ts](../main.ts). Atualmente `ClientesController`, `ProdutosController`, `UsuariosController` e `TitulosController` estão desativados.  
**Solução:** Descomente o controller desejado em [main.ts](../main.ts) para ativá-lo.

---

### Body da requisição ignorado / campos undefined

**Causa:** Header `Content-Type: application/json` ausente.  
**Solução:** Em todas as requisições POST/PATCH/PUT, certifique-se de que o header `Content-Type: application/json` está presente. Na coleção do Hoppscotch, ele já está configurado.

---

## 9. Referência rápida de scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe em modo dev com hot-reload (sem debug) |
| `npm run dev:debug` | Sobe em modo dev com hot-reload **e porta de debug 9229 aberta** — use com "Debug via ts-node-dev (attach)" |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Executa o build compilado (`dist/main.js`) |
| `npm run dev:build` | Compila em modo watch (sem rodar o servidor) |
