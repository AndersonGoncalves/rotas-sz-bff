# Trocar senha do MongoDB com backup

## Passo 1 — Backup (local e servidor)

**Local** — suba só o mongo com as credenciais antigas para fazer o dump:

```bash
cd ~/DevPrograms/Projetos/rotas-sz-bff

# Sobe apenas o mongo
docker compose up -d mongo

# Faz o backup do banco
docker compose exec mongo mongodump \
  -u admin \
  -p 'SENHA_ATUAL' \
  --authenticationDatabase admin \
  --db rotas-sz \
  --out /tmp/backup-rotas-sz

# Copia o backup para fora do container
docker cp $(docker compose ps -q mongo):/tmp/backup-rotas-sz ./backup-rotas-sz
```

**Servidor** — o mongo já está rodando, então:

```bash
cd ~/rotas-sz-bff

docker compose exec mongo mongodump \
  -u admin \
  -p 'SENHA_ATUAL' \
  --authenticationDatabase admin \
  --db rotas-sz \
  --out /tmp/backup-rotas-sz

docker cp $(docker compose ps -q mongo):/tmp/backup-rotas-sz ./backup-rotas-sz
```

> Se a senha contiver caracteres especiais como `@`, use aspas simples para evitar que o shell interprete o caractere.

---

## Passo 2 — Atualizar o `.env`

**Local** — edite o arquivo:

```bash
nano ~/DevPrograms/Projetos/rotas-sz-bff/.env
```

**Servidor** — edite o arquivo:

```bash
nano ~/rotas-sz-bff/.env
```

Deixe assim (substituindo `NOVA_SENHA`):

```
SERVER_PORT=3001
DB_URL=mongodb://admin:NOVA_SENHA@mongo:27017/rotas-sz?authSource=admin
MONGO_USER=admin
MONGO_PASSWORD=NOVA_SENHA
```

> Se a senha contiver `@`, ela deve ser codificada como `%40` na `DB_URL`. Exemplo: `senha@123` → `senha%40123@mongo:27017/...`

---

## Passo 3 — Recriar os containers com nova senha

O volume do MongoDB precisa ser removido para que o `MONGO_INITDB_ROOT_PASSWORD` seja aplicado com a nova senha.

**Local:**

```bash
cd ~/DevPrograms/Projetos/rotas-sz-bff
docker compose down -v
docker compose build api && docker compose up -d
```

**Servidor:**

```bash
cd ~/rotas-sz-bff
docker compose down -v
docker compose build api && docker compose up -d
```

---

## Passo 4 — Restaurar o backup

O backup salvo no disco é copiado de volta para o novo container e restaurado.

**Local:**

```bash
# Copia o backup de volta para o container
docker cp ./backup-rotas-sz $(docker compose ps -q mongo):/tmp/backup-rotas-sz

# Restaura
docker compose exec mongo mongorestore \
  -u admin \
  -p 'NOVA_SENHA' \
  --authenticationDatabase admin \
  --db rotas-sz \
  /tmp/backup-rotas-sz/rotas-sz
```

**Servidor:**

```bash
docker cp ./backup-rotas-sz $(docker compose ps -q mongo):/tmp/backup-rotas-sz

docker compose exec mongo mongorestore \
  -u admin \
  -p 'NOVA_SENHA' \
  --authenticationDatabase admin \
  --db rotas-sz \
  /tmp/backup-rotas-sz/rotas-sz
```

---

## Passo 5 — Verificar

```bash
docker compose logs api --tail=20
```

Deve aparecer:

```
[DB] Conectado ao MongoDB: mongodb://admin:NOVA_SENHA@mongo:27017/rotas-sz?authSource=admin
[Server] rotas-sz-bff rodando na porta 3001
```
