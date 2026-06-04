# Infraestrutura AWS — Servidor EC2 + Docker

Este documento cobre o dia a dia de manutenção do servidor Ubuntu na AWS que roda a API (rotas-sz-bff) e o banco de dados MongoDB em containers Docker.

> Para deploy local com Docker, consulte [deploy-docker.md](deploy-docker.md).

---

## Sumário

- [Dados do servidor](#dados-do-servidor)
- [1. Acessar o servidor via SSH](#1-acessar-o-servidor-via-ssh)
- [2. Gerenciar os containers (dia a dia)](#2-gerenciar-os-containers-dia-a-dia)
- [3. Atualizar a aplicação](#3-atualizar-a-aplicação)
- [4. Ver logs da aplicação](#4-ver-logs-da-aplicação)
- [5. Banco de dados MongoDB](#5-banco-de-dados-mongodb)
- [6. URLs e portas de acesso externo](#6-urls-e-portas-de-acesso-externo)
- [7. Liberar portas no Security Group da AWS](#7-liberar-portas-no-security-group-da-aws)
- [8. Instalação inicial do servidor (referência)](#8-instalação-inicial-do-servidor-referência)
- [Resolução de problemas comuns](#resolução-de-problemas-comuns)

---

## Dados do servidor

| Item              | Valor                                    |
|-------------------|------------------------------------------|
| Provedor          | AWS EC2                                  |
| Sistema operacional | Ubuntu                                 |
| IP público        | `54.87.117.64`                           |
| Usuário SSH       | `ubuntu`                                 |
| Chave privada     | `/home/anderson/Downloads/chave-servidor.pem` |
| Security Group    | `launch-wizard-1`                        |
| URL da API        | `http://54.87.117.64:3001`               |
| MongoDB externo   | `mongodb://54.87.117.64:27017`           |

---

## 1. Acessar o servidor via SSH

### Primeira vez — ajustar permissão da chave

O Linux rejeita chaves `.pem` com permissão aberta. Execute **uma única vez** no seu terminal local:

```bash
chmod 400 /home/anderson/Downloads/chave-servidor.pem
```

### Conectar ao servidor

```bash
ssh -i /home/anderson/Downloads/chave-servidor.pem ubuntu@54.87.117.64
```

Quando aparecer a pergunta `Are you sure you want to continue connecting?`, digite `yes` e pressione **Enter**.

Para **sair** do servidor a qualquer momento:

```bash
exit
```

---

## 2. Gerenciar os containers (dia a dia)

Todos os comandos abaixo devem ser executados **dentro do servidor** (após conectar via SSH) e **dentro da pasta do projeto**:

```bash
cd rotas-sz-bff
```

### Verificar se os containers estão rodando

```bash
docker ps
```

A saída deve mostrar dois containers ativos: a API (Node.js) e o banco de dados (MongoDB). Se a coluna `STATUS` mostrar `Up`, está tudo certo.

### Subir os containers (iniciar a aplicação)

```bash
docker compose up -d
```

A flag `-d` faz os containers rodarem em segundo plano (você não fica preso no terminal).

### Parar os containers

```bash
docker compose down
```

Isso para e remove os containers, mas **não apaga os dados do banco** (eles ficam salvos em um volume Docker).

### Reiniciar os containers (útil após mudanças)

```bash
docker compose down && docker compose up -d
```

### Ver todos os containers (incluindo os parados)

```bash
docker ps -a
```

---

## 3. Atualizar a aplicação

Quando você fizer um `git push` de uma nova versão, siga este fluxo no servidor:

```bash
# 1. Acessar a pasta do projeto
cd rotas-sz-bff

# 2. Baixar as alterações mais recentes do GitHub
git pull

# 3. Reconstruir a imagem da API com o novo código
docker compose build api

# 4. Reiniciar os containers com a nova imagem
docker compose up -d
```

> **Por que o `docker compose build`?** O Docker cria uma imagem estática do código. Sem reconstruir, ele continua usando a imagem antiga mesmo depois do `git pull`.

---

## 4. Ver logs da aplicação

Útil para investigar erros ou confirmar que a API está respondendo.

### Ver logs da API em tempo real (acompanhar ao vivo)

```bash
docker compose logs -f api
```

Pressione `Ctrl + C` para parar de acompanhar os logs (os containers continuam rodando).

### Ver logs do MongoDB em tempo real

```bash
docker compose logs -f mongo
```

### Ver as últimas 50 linhas de log da API

```bash
docker compose logs --tail=50 api
```

### Ver logs de todos os containers de uma vez

```bash
docker compose logs -f
```

---

## 5. Banco de dados MongoDB

### Acessar o MongoDB pelo terminal (dentro do servidor)

```bash
docker exec -it rotas-sz-bff-mongo-1 mongosh
```

> O nome do container pode variar. Para confirmar o nome exato, rode `docker ps` e olhe a coluna `NAMES`.

### Comandos básicos dentro do mongosh

```javascript
// Listar todos os bancos de dados
show dbs

// Selecionar o banco da aplicação (verifique o nome no seu .env ou docker-compose.yml)
use rotas-sz

// Listar as coleções (tabelas) do banco
show collections

// Ver os documentos de uma coleção
db.pedidos.find().pretty()

// Sair do mongosh
exit
```

### Acessar o MongoDB pelo MongoDB Compass (interface gráfica, no seu computador local)

1. Abra o MongoDB Compass.
2. Cole a string de conexão: `mongodb://54.87.117.64:27017`
3. Clique em **Connect**.

> A porta `27017` precisa estar liberada no Security Group da AWS. Veja a seção [7](#7-liberar-portas-no-security-group-da-aws).

---

## 6. URLs e portas de acesso externo

Com os containers rodando, os serviços ficam disponíveis no IP público da instância:

| Serviço              | Porta | URL / String de conexão              |
|----------------------|-------|--------------------------------------|
| API / BFF (Node.js)  | 3001  | `http://54.87.117.64:3001`           |
| Banco de dados (MongoDB) | 27017 | `mongodb://54.87.117.64:27017`   |

### Testar se a API está respondendo

```bash
curl http://54.87.117.64:3001
```

Ou abra a URL no navegador. Se retornar alguma resposta JSON, a API está no ar.

---

## 7. Liberar portas no Security Group da AWS

Para que conexões externas (Postman, Compass, navegador) cheguem ao servidor, as portas precisam estar abertas no Security Group `launch-wizard-1`.

1. Acesse o [painel da AWS](https://console.aws.amazon.com/ec2).
2. No menu lateral, clique em **Security Groups**.
3. Selecione o grupo `launch-wizard-1`.
4. Clique na aba **Inbound rules** e depois em **Edit inbound rules**.
5. Adicione as regras abaixo se ainda não existirem:

| Tipo        | Protocolo | Porta | Origem    | Motivo                        |
|-------------|-----------|-------|-----------|-------------------------------|
| Custom TCP  | TCP       | 3001  | 0.0.0.0/0 | API acessível externamente    |
| Custom TCP  | TCP       | 27017 | 0.0.0.0/0 | MongoDB acessível pelo Compass |
| SSH         | TCP       | 22    | Seu IP    | Acesso SSH ao servidor        |

> **Atenção:** Deixar a porta `27017` aberta para `0.0.0.0/0` (qualquer IP) é prático para desenvolvimento, mas não é recomendado em produção. Em produção, restrinja ao IP do seu computador ou use um túnel SSH.

---

## 8. Instalação inicial do servidor (referência)

Esta seção documenta o que foi feito para preparar o servidor do zero. Não é necessário repetir.

### Atualizar o sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### Instalar Docker e Docker Compose

```bash
sudo apt install docker.io docker-compose-v2 -y
```

### Permitir rodar Docker sem `sudo`

```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

### Clonar o projeto

```bash
git clone https://github.com/AndersonGoncalves/rotas-sz-bff.git
cd rotas-sz-bff
```

### Subir a aplicação pela primeira vez

```bash
docker compose up -d
```

---

## Resolução de problemas comuns

### Os containers não sobem / a API não responde

```bash
# Ver o status atual
docker ps -a

# Ver o log de erro da API
docker compose logs --tail=100 api
```

Procure na saída por mensagens de erro como `MongoNetworkError`, `ECONNREFUSED` ou `Cannot find module`.

### Erro "Permission denied" ao rodar `docker`

O usuário não está no grupo `docker`. Execute e reconecte:

```bash
sudo usermod -aG docker ubuntu
```

Feche a sessão SSH com `exit` e conecte novamente.

### O `git pull` pede usuário e senha (repositório privado)

Use um Personal Access Token do GitHub como senha:

1. No GitHub, vá em **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
2. Gere um token com permissão `repo`.
3. Quando o terminal pedir a senha, cole o token (não a senha da sua conta).

### Descobrir o nome exato dos containers

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Ver quanto espaço o Docker está usando no disco

```bash
docker system df
```

### Limpar imagens e containers antigos (liberar espaço)

```bash
docker system prune -f
```

> Este comando remove apenas containers parados e imagens sem uso. Não apaga dados de volumes.
