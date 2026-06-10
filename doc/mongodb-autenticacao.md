# Configurando autenticação no MongoDB (Docker)

Este guia descreve como adicionar senha ao MongoDB rodando via Docker Compose, preservando os dados existentes.

---

## Pré-requisitos

- Docker e Docker Compose instalados no servidor
- Acesso SSH ao servidor
- Studio 3T (ou outro cliente MongoDB) para verificar a conexão

---

## 1. Atualizar o projeto localmente

### 1.1. Criar o arquivo `.env`

Crie o arquivo `.env` na raiz do projeto (ele já está no `.gitignore` e **não será versionado**):

```
SERVER_PORT=3001
DB_URL=mongodb://admin:SUA_SENHA@mongo:27017/rotas-sz?authSource=admin
MONGO_USER=admin
MONGO_PASSWORD=SUA_SENHA
```

### 1.2. Atualizar o `docker-compose.yml`

**Serviço `api`** — carregar o `.env` e remover a `DB_URL` hardcoded:

```yaml
api:
  env_file:
    - .env
  environment:
    SERVER_PORT: 3001
    AWS_BUCKET_NAME: ...
    AWS_REGION: ...
```

**Serviço `mongo`** — adicionar credenciais e atualizar o healthcheck:

```yaml
mongo:
  environment:
    MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
    MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
  healthcheck:
    test: ["CMD", "mongosh", "-u", "${MONGO_USER}", "-p", "${MONGO_PASSWORD}", "--eval", "db.adminCommand('ping')"]
```

### 1.3. Atualizar o `.env.example`

Atualize o `.env.example` com as novas variáveis (sem a senha real) para orientar outros desenvolvedores:

```
DB_URL=mongodb://admin:senha@mongo:27017/rotas-sz?authSource=admin
MONGO_USER=admin
MONGO_PASSWORD=senha
```

### 1.4. Enviar as alterações para o servidor

```bash
git add docker-compose.yml .env.example
git commit -m "feat: add MongoDB authentication"
git push
```

> O arquivo `.env` **não deve ser commitado**. Ele será criado manualmente no servidor.

---

## 2. No servidor (SSH)

### 2.1. Acessar o diretório do projeto e atualizar

```bash
cd ~/rotas-sz-bff
git pull
```

### 2.2. Fazer backup dos dados antes de recriar o ambiente

> **Importante:** o passo seguinte apaga o volume do banco. Faça backup antes.

```bash
docker compose exec mongo mongodump --out /data/backup
docker compose cp mongo:/data/backup ./backup-mongo
```

Verifique se o backup foi criado:

```bash
ls ./backup-mongo
```

### 2.3. Criar o `.env` no servidor

```bash
cat > .env << 'EOF'
SERVER_PORT=3001
DB_URL=mongodb://admin:SUA_SENHA@mongo:27017/rotas-sz?authSource=admin
MONGO_USER=admin
MONGO_PASSWORD=SUA_SENHA
EOF
```

### 2.4. Recriar o ambiente com autenticação

```bash
docker compose down -v   # remove containers e o volume do banco
docker compose up -d     # sobe do zero com autenticação ativa
```

Para subir com **modo debug** (porta 9229 para attach do debugger):

```bash
docker compose down -v
docker compose -f docker-compose.yml -f docker-compose.debug.yml up -d
```

> O MongoDB só aplica `MONGO_INITDB_ROOT_*` na **primeira inicialização**. Por isso o volume precisa ser recriado.

### 2.5. Restaurar os dados

```bash
docker compose cp ./backup-mongo mongo:/data/backup
docker compose exec mongo mongorestore \
  -u admin \
  -p "SUA_SENHA" \
  --authenticationDatabase admin \
  /data/backup
```

---

## 3. Conectar pelo Studio 3T

Na aba **Authentication** da conexão:

| Campo             | Valor              |
|-------------------|--------------------|
| Authentication Mode | Basic (SCRAM-SHA-256) |
| User name         | `admin`            |
| Password          | `SUA_SENHA`        |
| Authentication DB | `admin`            |

Na aba **SSL**: **desativar SSL** (o container não usa SSL por padrão).

---

## Observações

- O app mobile (`rotas-sz-app`) **não precisa ser recompilado**. Ele se comunica com a API, não diretamente com o banco.
- O arquivo `.env` deve ser criado manualmente em cada ambiente (local e servidor). Nunca o versione.
- Para ambientes de produção, considere usar AWS Secrets Manager ou variáveis de ambiente do serviço de hospedagem em vez do arquivo `.env`.
