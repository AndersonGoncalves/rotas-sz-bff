# Subir o Docker remotamente via SSH

Permite que outra máquina execute comandos e suba o Docker neste Ubuntu (`192.168.1.25`).

## Pré-requisitos

Executar neste Ubuntu (máquina host):

```bash
sudo apt install openssh-server -y
sudo systemctl enable ssh
sudo systemctl start ssh
```

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

## Verificar se os containers subiram

```bash
ssh anderson@192.168.1.25 "docker compose -f /home/anderson/DevPrograms/Projetos/rotas-sz-bff/docker-compose.yml ps"
```

## Acessar a API pelo celular ou outra máquina

Com os containers rodando, a API fica disponível em:

```
http://192.168.1.25:3001
```
