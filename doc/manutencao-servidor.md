# Manutenção e monitoramento do servidor — Docker, API e MongoDB

Comandos para acompanhar a saúde do servidor, prevenir quedas (disco cheio, OOM, log gigante) e diagnosticar problemas rapidamente.

> A maioria dos comandos usa `$(docker compose ps -q api)` ou `$(docker compose ps -q mongo)` para descobrir o ID do container automaticamente — não é necessário saber o nome exato do container. Rode os comandos sempre a partir da raiz do projeto (onde está o `docker-compose.yml`).

---

## Status geral

```bash
# Status dos containers (Up, Restarting, Exited...)
docker compose ps

# Inclui containers parados
docker compose ps -a

# Status do healthcheck do Mongo (healthy / unhealthy / starting)
docker inspect --format='{{.State.Health.Status}}' $(docker compose ps -q mongo)

# Há quanto tempo o container está rodando / quantas vezes reiniciou
docker inspect --format='Status={{.State.Status}} Restarts={{.RestartCount}} StartedAt={{.State.StartedAt}}' $(docker compose ps -q api)
```

## Logs

```bash
# Acompanhar logs em tempo real
docker compose logs -f api
docker compose logs -f mongo
docker compose logs -f          # os dois juntos

# Ver só as últimas N linhas (sem ficar seguindo)
docker compose logs --tail=200 api

# Ver logs com timestamp
docker compose logs -f --timestamps api
```

### Tamanho do arquivo de log em disco

Com a rotação configurada (`max-size: 10m`, `max-file: 3`), cada container tem no máximo ~30MB de log. Para conferir o tamanho atual:

```bash
# Tamanho do log da API
docker inspect --format='{{.LogPath}}' $(docker compose ps -q api) | xargs sudo ls -lh

# Tamanho do log do Mongo
docker inspect --format='{{.LogPath}}' $(docker compose ps -q mongo) | xargs sudo ls -lh

# Ver todos os arquivos de rotação (.log, .log.1, .log.2...)
docker inspect --format='{{.LogPath}}' $(docker compose ps -q mongo) | xargs dirname | xargs sudo ls -lh
```

## Uso de CPU e memória (recursos)

```bash
# Uso em tempo real de todos os containers (CPU %, MEM uso/limite, rede, disco)
docker stats

# Uma leitura só, sem ficar atualizando (bom para logs/scripts)
docker stats --no-stream

# Apenas api e mongo
docker stats --no-stream $(docker compose ps -q)
```

> Se `MEM %` chegar perto de 100% ou o container reiniciar sozinho sem erro claro no log, é sinal de falta de memória (OOM kill). Confirme com:
> ```bash
> dmesg -T | grep -i "killed process"
> ```

## MongoDB — tamanho do banco e das collections

```bash
# Entrar no shell do Mongo autenticado
docker compose exec mongo mongosh -u "$MONGO_USER" -p "$MONGO_PASSWORD" --authenticationDatabase admin rotas-sz
```

Dentro do `mongosh` (ou em um `--eval` direto pelo terminal):

```js
// Tamanho total do banco (dataSize, storageSize, indexSize em bytes)
db.stats()

// Mesma coisa, em MB, mais fácil de ler
db.stats(1024 * 1024)

// Tamanho de uma collection específica
db.getCollection("pedido").stats()

// Tamanho de todas as collections, ordenado da maior pra menor
db.getCollectionNames().map(c => ({
  collection: c,
  sizeMB: (db.getCollection(c).stats().storageSize / 1024 / 1024).toFixed(2),
  docs: db.getCollection(c).countDocuments()
})).sort((a, b) => b.sizeMB - a.sizeMB)
```

Direto do terminal (sem abrir o shell interativo), com o mesmo `--eval` usado no healthcheck:

```bash
docker compose exec mongo mongosh -u "$MONGO_USER" -p "$MONGO_PASSWORD" --authenticationDatabase admin rotas-sz --eval "db.stats(1024*1024)"
```

## Disco

```bash
# Espaço livre/usado por partição
df -h

# Memória RAM disponível/usada no host
free -h

# Tamanho ocupado pelo Docker no geral (imagens, containers, volumes, cache de build)
docker system df

# Mesmo comando, detalhado item por item
docker system df -v

# Tamanho físico do volume do Mongo no disco (Linux)
sudo du -sh /var/lib/docker/volumes/rotas-sz-bff_mongo_data/_data
```

## Reiniciar e atualizar serviços

```bash
# Reiniciar só a API (ex.: após ajuste de config, sem precisar de rebuild)
docker compose restart api

# Reiniciar só o Mongo
docker compose restart mongo

# Depois de alterar código-fonte: precisa rebuild, não só restart
docker compose up -d --build

# Parar tudo sem apagar dados
docker compose stop

# Subir de novo
docker compose up -d
```

## Backup e restore do MongoDB

```bash
# Gerar backup dentro do container
docker compose exec mongo mongodump -u "$MONGO_USER" -p "$MONGO_PASSWORD" --authenticationDatabase admin --db rotas-sz --out /data/backup

# Copiar o backup do container para o host
docker cp $(docker compose ps -q mongo):/data/backup "./backup-$(date +%Y%m%d)"

# Restaurar um backup (cuidado: sobrescreve os dados existentes)
docker compose exec -T mongo mongorestore -u "$MONGO_USER" -p "$MONGO_PASSWORD" --authenticationDatabase admin --db rotas-sz --drop /data/backup/rotas-sz
```

> Rode o backup periodicamente (ex.: via `cron`) e copie o resultado para fora do servidor (S3, outro disco) — o volume Docker sozinho não te protege contra a máquina inteira falhar.

## Limpeza do Docker (liberar espaço em disco)

```bash
# Remove imagens, containers parados e redes não usadas (não mexe em volumes)
docker system prune -f

# Remove também imagens antigas não usadas por nenhum container
docker image prune -a -f

# Ver o que seria removido, sem remover (dry-run mental: só liste antes)
docker images
docker ps -a
```

> Evite `docker volume prune` no servidor de produção sem checar antes com `docker volume ls` — ele remove volumes órfãos, e um erro de digitação ou um `docker compose down` mal feito pode deixar o `mongo_data` órfão e apagável.

## Bucket S3 (`api-node-storage-anderson-goncalves`)

Requer AWS CLI configurado (`aws configure`) com permissão de leitura no bucket.

```bash
# Tamanho total e quantidade de arquivos
aws s3 ls s3://api-node-storage-anderson-goncalves --recursive --summarize --human-readable

# Listar os maiores arquivos
aws s3 ls s3://api-node-storage-anderson-goncalves --recursive --human-readable | sort -k3 -h -r | head -20
```

## Rede e portas

```bash
# Confirmar que a API está escutando na 3001 e o Mongo NÃO está exposto (não deve aparecer 27017)
ss -tulnp

# Testar se a API está respondendo
curl -I http://localhost:3001

# Status do firewall
sudo ufw status
```

## Checklist rápido — "a API caiu" / "está fora do ar"

```bash
# 1. Os containers estão de pé?
docker compose ps

# 2. O que aconteceu nos últimos logs?
docker compose logs --tail=200 api
docker compose logs --tail=200 mongo

# 3. Foi falta de memória?
dmesg -T | grep -i "killed process"
docker stats --no-stream

# 4. Tem espaço em disco?
df -h

# 5. Tenta reiniciar
docker compose restart api mongo

# 6. Se nada resolver, sobe do zero mantendo os dados
docker compose down
docker compose up -d
```
