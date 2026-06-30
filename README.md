# rotas-sz-bff

API RESTful BFF (Backend for Frontend) construída com **Node.js**, **TypeScript** e **Restify**, seguindo **Clean Architecture**.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Configuração e Execução](#configuração-e-execução)
- [MongoDB](#mongodb)
- [Documentação da API (Swagger)](#documentação-da-api-swagger)
- [Arquitetura](#arquitetura)
  - [src/shared/config/environment.ts](#srcsharedconfigenvironmentts)
  - [src/shared/router/base.router.ts](#srcsharedrouterbase-routerts)
  - [src/shared/http/error.handler.ts](#srcshareddhttp-errorhandlerts)
  - [src/shared/http/server.ts](#srcsharedhttpserverts)
  - [src/shared/database/mongoose.connection.ts](#srcshareddatabasemongooseconnectionts)
  - [main.ts](#maints)
- [Rotas Disponíveis](#rotas-disponíveis)
- [Seeds de Banco de Dados](#seeds-de-banco-de-dados)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## Visão Geral

O **rotas-sz-bff** é a API de backend do sistema Rotas SZ. Expõe recursos para gerenciamento de pedidos, visitas, clientes, funcionários, produtos, checklists e outros dados operacionais, com dados persistidos no **MongoDB** via **Mongoose**.

A arquitetura segue o padrão **Clean Architecture**, separando responsabilidades em camadas: `domain` (entidades e interfaces), `application` (use cases), `infra` (repositórios e models Mongoose) e `presentation` (controllers/rotas).

A injeção de dependência acontece no `main.ts` (Composition Root), onde cada controller recebe seu repositório concreto.

---

## Estrutura do Projeto

```
rotas-sz-bff/
├── main.ts                              # Ponto de entrada — Composition Root
├── package.json
├── tsconfig.json
├── collections/
│   └── hoppscotch-collection.json       # Coleção de requisições para Hoppscotch
├── src/
│   ├── shared/
│   │   ├── config/
│   │   │   └── environment.ts           # Variáveis de ambiente (porta e URL do banco)
│   │   ├── database/
│   │   │   └── mongoose.connection.ts   # Classe de conexão com o MongoDB
│   │   ├── http/
│   │   │   ├── server.ts                # Criação e inicialização do servidor Restify
│   │   │   └── error.handler.ts         # Handler global de erros do Restify
│   │   ├── router/
│   │   │   └── base.router.ts           # Classe base abstrata (BaseRouter extends EventEmitter)
│   │   └── swagger/
│   │       ├── swagger.spec.ts          # Spec OpenAPI 3.0 (schemas e paths de todas as rotas)
│   │       └── swagger.controller.ts    # Serve GET /docs (UI) e GET /swagger.json
│   └── features/
│       ├── checklist-assistencia/       # Recurso: checklist de assistência
│       ├── checklist-assistencia-agua-natural/
│       ├── clientes/                    # Recurso: clientes (com use cases)
│       ├── funcionarios/                # Recurso: funcionários
│       ├── motivos-retorno/             # Recurso: motivos de retorno
│       ├── motivos-situacao/            # Recurso: motivos de situação
│       ├── pedidos/                     # Recurso: pedidos (romaneios)
│       ├── pendencias/                  # Recurso: pendências
│       ├── produtos/                    # Recurso: produtos
│       ├── produtos-entregue/           # Recurso: produtos entregues
│       ├── produtos-recebido/           # Recurso: produtos recebidos
│       ├── titulos/                     # Recurso: títulos financeiros
│       ├── usuarios/                    # Recurso: usuários
│       └── visitas/                     # Recurso: visitas
│
│   # Cada feature segue a mesma estrutura interna:
│   # ├── domain/
│   # │   ├── entities/      ← interface da entidade
│   # │   └── repositories/  ← interface do repositório
│   # ├── application/
│   # │   └── usecases/      ← casos de uso (quando existem)
│   # ├── infra/
│   # │   ├── models/        ← schema e model Mongoose
│   # │   └── repositories/  ← implementação concreta do repositório
│   # └── presentation/
│   #     └── *.controller.ts ← rotas HTTP (estende BaseRouter)
```

---

## Tecnologias

| Tecnologia              | Versão  | Finalidade                                                                 |
| ----------------------- | ------- | -------------------------------------------------------------------------- |
| Node.js                 | —       | Runtime JavaScript                                                         |
| TypeScript              | ^6.0.3  | Tipagem estática                                                           |
| Restify                 | 6.3.4   | Framework HTTP para APIs REST                                              |
| @types/restify          | 5.0.6   | Tipos TypeScript do Restify                                                |
| mongoose                | 6.13.9  | ODM para MongoDB (inclui os próprios tipos TS)                             |
| restify-errors          | 5.0.0   | Erros HTTP tipados (`NotFoundError`, `BadRequestError`, `ConflictError`)   |
| @types/restify-errors   | 4.3.2   | Tipos TypeScript do restify-errors                                         |
| bcrypt                  | 5.1.1   | Hashing seguro de senhas                                                   |
| @types/bcrypt           | 6.0.0   | Tipos TypeScript do bcrypt                                                 |
| dotenv                  | ^17.4.2 | Carregamento de variáveis de ambiente a partir do arquivo `.env`           |
| ts-node-dev             | ^2.0.0  | Executa TypeScript diretamente com reinicialização automática              |

---

## Configuração e Execução

**1. Instalar dependências**

```bash
npm install
```

**2. Compilar o TypeScript**

```bash
npx tsc
```

**3. Executar o servidor**

```bash
node dist/main.js
```

Ou com o Nodemon para reinicialização automática ao alterar `dist/main.js`:

```bash
nodemon --inspect-brk dist/main.js
```

O comando acima executa o servidor com o Nodemon e ativa o modo de depuração do Node.js (`--inspect-brk`).
Assim, o servidor será reiniciado automaticamente a cada alteração em `dist/main.js` e estará pronto para ser depurado por ferramentas como o VS Code, permitindo breakpoints e inspeção do código durante a execução.

O servidor ficará disponível em `http://localhost:3001`.

> A porta pode ser alterada pela variável de ambiente `SERVER_PORT`:
>
> ```bash
> SERVER_PORT=4000 node dist/main.js
> ```

---

## MongoDB

### Localização no Ubuntu

O binário do MongoDB está instalado em `/usr/bin/mongod`.

| Arquivo      | Caminho                       |
| ------------ | ----------------------------- |
| Binário      | `/usr/bin/mongod`             |
| Configuração | `/etc/mongod.conf`            |
| Dados        | `/var/lib/mongodb`            |
| Logs         | `/var/log/mongodb/mongod.log` |

### Gerenciamento do serviço (systemd)

```bash
# Iniciar
sudo systemctl start mongod

# Parar
sudo systemctl stop mongod

# Reiniciar
sudo systemctl restart mongod

# Ver status
sudo systemctl status mongod

# Iniciar automaticamente no boot
sudo systemctl enable mongod
```

### Conectar ao shell do MongoDB

```bash
# Versão atual
mongosh

# Versão legada
mongo
```

> Se receber o erro `Unit mongod.service not found`, inicie diretamente pelo binário:
>
> ```bash
> sudo mongod --config /etc/mongod.conf
> ```

---

## Documentação da API (Swagger)

A documentação interativa da API é servida pelo próprio servidor, sem dependências extras. A UI utiliza o **Swagger UI** carregado via CDN.

### Como executar

**1. Inicie o servidor** (escolha uma das opções):

```bash
# Modo desenvolvimento — recompila e reinicia automaticamente ao editar .ts
npm run dev

# Modo produção — compila primeiro e depois executa
npx tsc && node dist/main.js
```

**2. Abra a documentação no browser:**

```
http://localhost:3001/docs
```

> A UI utiliza **Swagger UI** carregado via CDN — é necessário conexão com a internet para que os assets sejam carregados corretamente.

**3. (Opcional) Acesse a spec OpenAPI 3.0 em JSON:**

```
http://localhost:3001/swagger.json
```

### Endpoints

| Endpoint            | Descrição                                         |
| ------------------- | ------------------------------------------------- |
| `GET /docs`         | Interface interativa Swagger UI (abre no browser) |
| `GET /swagger.json` | Spec OpenAPI 3.0 em JSON                          |

### Arquivos

| Arquivo | Responsabilidade |
| ------- | ---------------- |
| `src/shared/swagger/swagger.spec.ts` | Objeto TypeScript com a spec OpenAPI 3.0 completa — tags, paths, parâmetros e schemas de todas as features ativas |
| `src/shared/swagger/swagger.controller.ts` | Controller registrado no bootstrap que expõe os dois endpoints acima |

> Para atualizar a documentação ao adicionar ou modificar rotas, edite `swagger.spec.ts` diretamente.

---

## Arquitetura

### `src/shared/config/environment.ts`

Centraliza as configurações de ambiente da aplicação. Carrega o arquivo `.env` via `dotenv` e expõe a porta do servidor e a URL de conexão com o MongoDB.

```typescript
export const environment = {
  server: {
    port: process.env.SERVER_PORT || 3001,
  },
  db: {
    url: process.env.DB_URL || 'mongodb://localhost:27017/rotas-sz',
  },
};
```

---

### `src/shared/router/base.router.ts`

Define a **classe base abstrata** `BaseRouter`, que estende `EventEmitter`. Todo controller da aplicação deve estender essa classe e implementar `applyRoutes`.

**Método `render(response, next)`** — helper que elimina o boilerplate de resposta em todas as rotas: se o documento existir emite o evento `beforeRender` e envia `200 JSON`, caso contrário **lança `NotFoundError`**, que é capturado pelo handler global `restifyError` e retornado ao cliente como `404` com corpo JSON.

```typescript
export abstract class BaseRouter extends EventEmitter {
  abstract applyRoutes(application: restify.Server): void;

  render(response: restify.Response, next: restify.Next) {
    return (document: any) => {
      if (document !== null && document !== undefined) {
        this.emit('beforeRender', document);
        response.json(document);
      } else {
        throw new NotFoundError('Registro não encontrado');
      }
      return next();
    };
  }
}
```

---

### `src/shared/http/error.handler.ts`

Handler global de erros registrado no evento `restifyError` do servidor Restify. É executado automaticamente toda vez que qualquer rota chama `next(err)` ou lança uma exceção capturada pelo domínio do Restify.

**Responsabilidades:**

- Sobrescreve `toJSON` via `Object.defineProperty` (necessário pois o Mongoose define `toJSON` como `writable: false` no prototype) para controlar o shape do JSON de erro na resposta.
- Detecta erros do MongoDB (`MongoError` / `MongoServerError` com `code === 11000` — chave duplicada) e retorna `409 Conflict`.
- Detecta erros de validação do Mongoose (`ValidationError`) e retorna `400` com um array de mensagens de validação por campo.
- Detecta `CastError` (ID inválido) e retorna `400 Bad Request`.

```typescript
export const handleError = (req, res, err, done) => {
  switch (err.name) {
    case 'MongoServerError':
      if (err.code === 11000) {
        err.statusCode = 409;
        // ...
      }
      break;
    case 'ValidationError':
      err.statusCode = 400;
      // ...
      break;
    case 'CastError':
      err.statusCode = 400;
      // ...
      break;
  }
  return done();
};
```

> **Por que `Object.defineProperty`?** O `ValidationError` do Mongoose define `toJSON` no prototype com `writable: false`. Em strict mode (padrão nos arquivos TypeScript compilados), a atribuição direta `err.toJSON = ...` lança `TypeError`. `Object.defineProperty` com `writable: true, configurable: true` sobrescreve o descriptor sem erro.

---

### `src/shared/http/server.ts`

Responsável por criar e inicializar o servidor Restify. Possui três métodos:

- **`initializeServer()`** — cria o servidor com um formatter customizado para `application/json`, registra os plugins `queryParser` e `bodyParser`, configura os headers **CORS** (permitindo qualquer origem), responde a requisições `OPTIONS` e registra o handler global de erros.
- **`initializeRoutes(controllers)`** — percorre os controllers chamando `applyRoutes` em cada um.
- **`bootstrap(controllers)`** — executa `initializeServer()`, `initializeRoutes()`, conecta ao MongoDB e inicia a escuta na porta configurada.

```typescript
bootstrap(controllers: BaseRouter[]): Promise<Server> {
  this.initializeServer();
  this.initializeRoutes(controllers);

  const db = new MongooseConnection();
  return db.connect().then(() => {
    return new Promise<Server>((resolve) => {
      this.application.listen(environment.server.port, () => resolve(this));
    });
  });
}
```

---

### `src/shared/database/mongoose.connection.ts`

Encapsula a conexão com o MongoDB via Mongoose. Configura `strictQuery: true` para suprimir o aviso de depreciação do Mongoose 6.

```typescript
export class MongooseConnection {
  connect(): Promise<typeof mongoose> {
    mongoose.set('strictQuery', true);
    return mongoose.connect(environment.db.url);
  }
}
```

---

### `main.ts`

Ponto de entrada e **Composition Root** da aplicação. Toda a injeção de dependência acontece aqui: cada controller recebe seu repositório concreto como argumento do construtor.

```typescript
const server = new Server();
server
  .bootstrap([
    new ChecklistAssistenciaController(new ChecklistAssistenciaMongooseRepository()),
    new FuncionariosController(new FuncionarioMongooseRepository()),
    new PedidosController(new PedidoMongooseRepository()),
    new VisitasController(new VisitaMongooseRepository()),
    // ... demais controllers
  ])
  .catch((error) => {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  });
```

---

## Rotas Disponíveis

O servidor escuta na porta **3001** por padrão.

### Pedidos

| Método   | Rota           | Descrição                                             |
| -------- | -------------- | ----------------------------------------------------- |
| `GET`    | `/pedidos`     | Lista pedidos. Aceita query params `?month=X&year=Y`  |
| `GET`    | `/pedidos/:id` | Retorna um pedido pelo id                             |
| `PUT`    | `/pedidos/:id` | Cria ou substitui um pedido (upsert pelo id externo)  |
| `PATCH`  | `/pedidos/:id` | Atualiza campos parcialmente                          |
| `DELETE` | `/pedidos/:id` | Remove um pedido                                      |

### Visitas

| Método   | Rota           | Descrição                          |
| -------- | -------------- | ---------------------------------- |
| `GET`    | `/visitas`     | Lista todas as visitas             |
| `GET`    | `/visitas/:id` | Retorna uma visita pelo id         |
| `POST`   | `/visitas`     | Cria uma nova visita               |
| `PATCH`  | `/visitas/:id` | Atualiza campos parcialmente       |
| `DELETE` | `/visitas/:id` | Remove uma visita                  |

### Clientes *(desativado temporariamente)*

| Método   | Rota            | Descrição                          |
| -------- | --------------- | ---------------------------------- |
| `GET`    | `/clientes`     | Lista todos os clientes            |
| `GET`    | `/clientes/:id` | Retorna um cliente pelo id         |
| `POST`   | `/clientes`     | Cria um novo cliente               |
| `PATCH`  | `/clientes/:id` | Atualiza campos parcialmente       |
| `DELETE` | `/clientes/:id` | Remove um cliente                  |

### Funcionários

| Método   | Rota                | Descrição                          |
| -------- | ------------------- | ---------------------------------- |
| `GET`    | `/funcionarios`     | Lista todos os funcionários        |
| `GET`    | `/funcionarios/:id` | Retorna um funcionário pelo id     |
| `POST`   | `/funcionarios`     | Cria um novo funcionário           |
| `PATCH`  | `/funcionarios/:id` | Atualiza campos parcialmente       |
| `DELETE` | `/funcionarios/:id` | Remove um funcionário              |

### Checklist Assistência

| Método   | Rota                          | Descrição                          |
| -------- | ----------------------------- | ---------------------------------- |
| `GET`    | `/checklist-assistencia`      | Lista todos os registros           |
| `GET`    | `/checklist-assistencia/:id`  | Retorna um registro pelo id        |
| `PUT`    | `/checklist-assistencia/:id`  | Cria ou substitui (upsert)         |
| `DELETE` | `/checklist-assistencia/:id`  | Remove um registro                 |

### Checklist Assistência Água Natural

| Método   | Rota                                        | Descrição                  |
| -------- | ------------------------------------------- | -------------------------- |
| `GET`    | `/checklist-assistencia-agua-natural`       | Lista todos os registros   |
| `GET`    | `/checklist-assistencia-agua-natural/:id`   | Retorna um registro pelo id|
| `PUT`    | `/checklist-assistencia-agua-natural/:id`   | Cria ou substitui (upsert) |
| `DELETE` | `/checklist-assistencia-agua-natural/:id`   | Remove um registro         |

### Motivos de Retorno

| Método   | Rota                    | Descrição                          |
| -------- | ----------------------- | ---------------------------------- |
| `GET`    | `/motivos-retorno`      | Lista todos os motivos             |
| `GET`    | `/motivos-retorno/:id`  | Retorna um motivo pelo id          |
| `POST`   | `/motivos-retorno`      | Cria um novo motivo                |
| `PATCH`  | `/motivos-retorno/:id`  | Atualiza campos parcialmente       |
| `DELETE` | `/motivos-retorno/:id`  | Remove um motivo                   |

### Motivos de Situação

| Método   | Rota                     | Descrição                          |
| -------- | ------------------------ | ---------------------------------- |
| `GET`    | `/motivos-situacao`      | Lista todos os motivos             |
| `GET`    | `/motivos-situacao/:id`  | Retorna um motivo pelo id          |
| `POST`   | `/motivos-situacao`      | Cria um novo motivo                |
| `PATCH`  | `/motivos-situacao/:id`  | Atualiza campos parcialmente       |
| `DELETE` | `/motivos-situacao/:id`  | Remove um motivo                   |

### Pendências

| Método   | Rota               | Descrição                          |
| -------- | ------------------ | ---------------------------------- |
| `GET`    | `/pendencias`      | Lista todas as pendências          |
| `GET`    | `/pendencias/:id`  | Retorna uma pendência pelo id      |
| `POST`   | `/pendencias`      | Cria uma nova pendência            |
| `PATCH`  | `/pendencias/:id`  | Atualiza campos parcialmente       |
| `DELETE` | `/pendencias/:id`  | Remove uma pendência               |

### Produtos Entregues

| Método   | Rota                      | Descrição                          |
| -------- | ------------------------- | ---------------------------------- |
| `GET`    | `/produtos-entregue`      | Lista todos os registros           |
| `GET`    | `/produtos-entregue/:id`  | Retorna um registro pelo id        |
| `PUT`    | `/produtos-entregue/:id`  | Cria ou substitui (upsert)         |
| `DELETE` | `/produtos-entregue/:id`  | Remove um registro                 |

### Produtos Recebidos

| Método   | Rota                       | Descrição                          |
| -------- | -------------------------- | ---------------------------------- |
| `GET`    | `/produtos-recebido`       | Lista todos os registros           |
| `GET`    | `/produtos-recebido/:id`   | Retorna um registro pelo id        |
| `PUT`    | `/produtos-recebido/:id`   | Cria ou substitui (upsert)         |
| `DELETE` | `/produtos-recebido/:id`   | Remove um registro                 |

### Produtos *(desativado temporariamente)*

| Método   | Rota            | Descrição                          |
| -------- | --------------- | ---------------------------------- |
| `GET`    | `/produtos`     | Lista todos os produtos            |
| `GET`    | `/produtos/:id` | Retorna um produto pelo id         |
| `POST`   | `/produtos`     | Cria um novo produto               |
| `PATCH`  | `/produtos/:id` | Atualiza campos parcialmente       |
| `DELETE` | `/produtos/:id` | Remove um produto                  |

### Usuários *(desativado temporariamente)*

| Método   | Rota             | Descrição                          |
| -------- | ---------------- | ---------------------------------- |
| `GET`    | `/usuarios`      | Lista todos os usuários            |
| `GET`    | `/usuarios/:id`  | Retorna um usuário pelo id         |
| `POST`   | `/usuarios`      | Cria um novo usuário               |
| `PATCH`  | `/usuarios/:id`  | Atualiza campos parcialmente       |
| `DELETE` | `/usuarios/:id`  | Remove um usuário                  |

### Títulos *(desativado temporariamente)*

| Método   | Rota                        | Descrição                              |
| -------- | --------------------------- | -------------------------------------- |
| `GET`    | `/titulos`                  | Lista todos os títulos                 |
| `GET`    | `/titulos/:id`              | Retorna um título pelo id              |
| `GET`    | `/titulos/:tpgCodigo`       | Retorna títulos por código de grupo    |
| `POST`   | `/titulos`                  | Cria um novo título                    |
| `PATCH`  | `/titulos/:id`              | Atualiza campos parcialmente           |
| `DELETE` | `/titulos/:id`              | Remove um título                       |

---

## Seeds de Banco de Dados

Os seeds populam o banco via HTTP, fazendo `POST` direto na API em execução. Por padrão apontam para `http://localhost:3001`. Todos verificam duplicatas antes de inserir — registros já existentes são ignorados.

### Rodar todos os seeds

```bash
npm run seed
```

Para especificar uma URL diferente de localhost, passe como segundo argumento (o primeiro é a data, veja abaixo):

```bash
npm run seed -- "" http://outro-servidor:3001
```

### Seeds com argumento de data

Os seeds abaixo aceitam uma data de romaneio como primeiro argumento e a URL como segundo:

| Seed | Argumento 1 | Argumento 2 |
|---|---|---|
| `seed-pedidos.js` | data (ex: `2024-01-01`) | URL do servidor |
| `seed-produtos-entregue.js` | data | URL do servidor |
| `seed-produtos-recebido.js` | data | URL do servidor |

```bash
# Com data e URL customizada
node src/shared/database/seeds/seed-pedidos.js 2024-01-01 http://outro-servidor:3001

# Só com data (URL padrão localhost:3001)
node src/shared/database/seeds/seed-pedidos.js 2024-01-01

# Só com URL customizada (sem data — usa as datas dos JSONs)
node src/shared/database/seeds/seed-pedidos.js "" http://outro-servidor:3001
```

### Seeds sem argumento de data

Os seeds abaixo aceitam apenas a URL como argumento:

| Seed | Recurso |
|---|---|
| `seed-checklist-assistencia.js` | Checklist de assistência |
| `seed-checklist-assistencia-agua-natural.js` | Checklist de assistência água natural |
| `seed-funcionarios.js` | Funcionários |
| `seed-motivos-retorno.js` | Motivos de retorno |
| `seed-motivos-situacao.js` | Motivos de situação |
| `seed-pendencias.js` | Pendências |

```bash
# URL padrão (localhost:3001)
node src/shared/database/seeds/seed-funcionarios.js

# URL customizada
node src/shared/database/seeds/seed-funcionarios.js http://outro-servidor:3001
```

---

## Variáveis de Ambiente

| Variável      | Padrão                              | Descrição                    |
| ------------- | ----------------------------------- | ---------------------------- |
| `SERVER_PORT` | `3001`                              | Porta do servidor HTTP       |
| `DB_URL`      | `mongodb://localhost:27017/rotas-sz`| URL de conexão com o MongoDB |

Crie um arquivo `.env` na raiz do projeto para configurar as variáveis:

```env
SERVER_PORT=3001
DB_URL=mongodb://localhost:27017/rotas-sz
```

---

## Fluxo de Desenvolvimento — tsc -w + nodemon

Para trabalhar com recompilação e reinicialização automáticas ao editar os arquivos `.ts`, use **dois terminais em paralelo**:

### Terminal 1 — compilação automática do TypeScript

```bash
cd rotas-sz-bff
tsc -w
```

O `tsc -w` fica observando todos os arquivos `.ts`. Sempre que você salvar uma alteração, ele recompila e atualiza os arquivos em `dist/` automaticamente.

Saída esperada:

```
[10:00:00] Starting compilation in watch mode...
[10:00:01] Found 0 errors. Watching for file changes.
```

### Terminal 2 — reinicialização automática do servidor

```bash
cd rotas-sz-bff
nodemon dist/main.js
```

O `nodemon` fica monitorando `dist/main.js`. Sempre que o `tsc -w` gera um novo arquivo compilado, o `nodemon` reinicia o processo Node.js automaticamente.

### Fluxo completo

```
Você edita um arquivo .ts
       ↓
  tsc -w detecta a mudança
       ↓
  Recompila → gera novo dist/main.js
       ↓
  nodemon detecta a mudança em dist/main.js
       ↓
  Reinicia o servidor Node.js automaticamente
```

> **Resumo:** você edita o `.ts`, salva, e o servidor já reinicia com as alterações — sem precisar rodar nenhum comando manualmente.

---

## Depuração com VS Code

### Usando ts-node-dev (modo desenvolvimento)

```bash
npm run dev
```

O script `dev` executa `ts-node-dev --respawn --transpile-only main.ts`, compilando e reiniciando automaticamente sem precisar do passo intermediário de `tsc -w`.

### Usando node --inspect-brk (modo debug com breakpoints)

**1. Compile e inicie com o inspector:**

```bash
tsc
node --inspect-brk dist/main.js
```

**2. No VS Code, abra o painel Run and Debug (`Ctrl+Shift+D`).**

**3. Selecione a configuração de Attach e clique em ▶ play (F5).**

O VS Code conecta ao processo na porta `9229` e para nos breakpoints.

### Controles de debug do VS Code

| Tecla             | O que faz                                        |
| ----------------- | ------------------------------------------------ |
| **F5**            | Continuar até o próximo breakpoint               |
| **F10**           | Step Over — executa a linha e vai para a próxima |
| **F11**           | Step Into — entra dentro da função chamada       |
| **Shift+F11**     | Step Out — sai da função atual                   |
| **Ctrl+Shift+F5** | Reiniciar o debug                                |
| **Shift+F5**      | Parar o debug                                    |

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": ".",
    "target": "es2015",
    "module": "commonjs",
    "esModuleInterop": true,
    "sourceMap": true,
    "skipLibCheck": true
  }
}
```

| Opção             | O que faz                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `outDir`          | Pasta de destino dos arquivos `.js` compilados                                                                                          |
| `rootDir`         | Raiz dos arquivos `.ts` fonte                                                                                                           |
| `target`          | Versão do JavaScript gerado (`es2015` = ES6)                                                                                            |
| `module`          | Sistema de módulos (`commonjs` para Node.js)                                                                                            |
| `esModuleInterop` | Permite importar módulos CommonJS com sintaxe ES Modules                                                                                |
| `sourceMap`       | Gera arquivos `.js.map` para facilitar o debug no `.ts` original                                                                        |
| `skipLibCheck`    | Ignora erros de tipo em arquivos `.d.ts` de `node_modules` — necessário pois `@types/restify@5.0.6` possui um conflito interno de tipos |
