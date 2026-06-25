# Subir o Docker remotamente via SSH

Permite que outra máquina execute comandos e suba o Docker neste Ubuntu (`192.168.1.25`).

## Pré-requisitos

Executar neste Ubuntu (máquina host):

```bash
sudo apt install openssh-server -y
sudo systemctl enable ssh
sudo systemctl start ssh
```

## Alterou o fonte? Faça rebuild antes de subir

> **Sempre que alterar o código-fonte do projeto**, use os comandos abaixo em vez do simples `up -d`.
> O `restart` e o `up -d` sem `--build` sobem a imagem antiga, ignorando suas mudanças.

**No próprio Ubuntu:**

```bash
cd /home/anderson/DevPrograms/Projetos/rotas-sz-bff
git pull
docker compose down
docker compose up -d --build
```

**Via SSH (de outra máquina):**

```bash
ssh anderson@192.168.1.25 "cd /home/anderson/DevPrograms/Projetos/rotas-sz-bff && git pull && docker compose down && docker compose up -d --build"
```

---

## Subir o Docker da máquina remota

Na outra máquina, execute:

```bash
ssh anderson@192.168.1.25 "cd /home/anderson/DevPrograms/Projetos/rotas-sz-bff && docker compose up -d"
```

## Acesso sem senha (recomendado)

Evita digitar senha toda vez. Executar na máquina remota:

```bash
# Gerar chave SSH (pular se já existir)
ssh-keygen -t ed25519

# Copiar a chave pública para o Ubuntu
ssh-copy-id anderson@192.168.1.25
```

Após isso, o comando SSH funciona sem solicitar senha.

## Gerenciar os containers remotamente

Todos os comandos abaixo rodam via SSH da sua máquina Windows (ou qualquer outra máquina remota).

### Ver status

```bash
ssh anderson@192.168.1.25 "docker compose -f /home/anderson/DevPrograms/Projetos/rotas-sz-bff/docker-compose.yml ps"
```

### Ver logs

```bash
# Todos os containers
ssh anderson@192.168.1.25 "docker compose -f /home/anderson/DevPrograms/Projetos/rotas-sz-bff/docker-compose.yml logs"

# Apenas a API (em tempo real)
ssh anderson@192.168.1.25 "docker compose -f /home/anderson/DevPrograms/Projetos/rotas-sz-bff/docker-compose.yml logs -f api"
```

### Parar os containers

```bash
ssh anderson@192.168.1.25 "docker compose -f /home/anderson/DevPrograms/Projetos/rotas-sz-bff/docker-compose.yml stop"
```

### Reiniciar os containers

```bash
ssh anderson@192.168.1.25 "docker compose -f /home/anderson/DevPrograms/Projetos/rotas-sz-bff/docker-compose.yml restart"
```

### Derrubar e remover os containers

```bash
ssh anderson@192.168.1.25 "docker compose -f /home/anderson/DevPrograms/Projetos/rotas-sz-bff/docker-compose.yml down"
```

### Gerenciar diretamente no Ubuntu

Se preferir rodar os comandos diretamente no terminal do Ubuntu (sem SSH):

```bash
cd /home/anderson/DevPrograms/Projetos/rotas-sz-bff

docker compose ps
docker compose logs -f
docker compose stop
docker compose restart
docker compose down
docker compose up -d
```

> O Docker Desktop no Ubuntu usa um contexto separado (`desktop-linux`) e **não mostra** esses containers. Use sempre o terminal para gerenciá-los.

## Acessar a API pelo celular ou outra máquina

Com os containers rodando, a API fica disponível em:

```
http://192.168.1.25:3001
```
