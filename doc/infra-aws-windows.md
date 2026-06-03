# Infraestrutura AWS — Acesso pelo Windows

Este documento cobre o dia a dia de manutenção do servidor AWS a partir de uma máquina Windows. Para a versão Linux/Mac, consulte [infra-aws.md](infra-aws.md).

---

## Sumário

- [Dados do servidor](#dados-do-servidor)
- [1. Acessar o servidor via SSH](#1-acessar-o-servidor-via-ssh)
- [2. Gerenciar os containers (dia a dia)](#2-gerenciar-os-containers-dia-a-dia)
- [3. Atualizar a aplicação](#3-atualizar-a-aplicação)
- [4. Ver logs da aplicação](#4-ver-logs-da-aplicação)
- [5. Banco de dados MongoDB](#5-banco-de-dados-mongodb)
- [6. URLs e portas de acesso externo](#6-urls-e-portas-de-acesso-externo)
- [Resolução de problemas comuns](#resolução-de-problemas-comuns)

---

## Dados do servidor

| Item                  | Valor                                 |
|-----------------------|---------------------------------------|
| Provedor              | AWS EC2                               |
| Sistema operacional   | Ubuntu                                |
| IP público            | `54.198.39.78`                        |
| Usuário SSH           | `ubuntu`                              |
| Chave privada         | `C:\Users\seu-usuario\chave-servidor.pem` |
| URL da API            | `http://54.198.39.78:3001`            |
| MongoDB externo       | `mongodb://54.198.39.78:27017`        |

> Substitua `seu-usuario` pelo nome do seu usuário no Windows. Exemplo: `C:\Users\Anderson\chave-servidor.pem`.

---

## 1. Acessar o servidor via SSH

O Windows 10 e 11 já possuem o cliente SSH nativo. Não é necessário instalar nada extra — basta usar o **PowerShell** ou o **Prompt de Comando (cmd)**.

### Primeira vez — ajustar permissão da chave

O SSH rejeita a chave `.pem` se outras contas do Windows tiverem acesso a ela. Execute os comandos abaixo **uma única vez** no PowerShell (como Administrador):

```powershell
# Remover permissões herdadas
icacls "C:\Users\seu-usuario\chave-servidor.pem" /inheritance:r

# Conceder acesso somente ao seu usuário
icacls "C:\Users\seu-usuario\chave-servidor.pem" /grant:r "$($env:USERNAME):(R)"

# Remover outros usuários (incluindo SYSTEM e Administradores)
icacls "C:\Users\seu-usuario\chave-servidor.pem" /remove "BUILTIN\Administrators"
icacls "C:\Users\seu-usuario\chave-servidor.pem" /remove "NT AUTHORITY\SYSTEM"
```

> Se ainda aparecer o erro `UNPROTECTED PRIVATE KEY FILE`, repita os comandos acima.

### Conectar ao servidor

Abra o **PowerShell** e execute:

```powershell
ssh -i "C:\Users\seu-usuario\chave-servidor.pem" ubuntu@54.198.39.78
```

Na primeira conexão aparecerá a pergunta:

```
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Digite `yes` e pressione **Enter**.

Para **sair** do servidor a qualquer momento:

```bash
exit
```

### Alternativa: usar o Windows Terminal

O Windows Terminal (disponível na Microsoft Store) oferece uma experiência melhor que o PowerShell padrão. O comando SSH é o mesmo — apenas o terminal muda.

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

A saída deve mostrar dois containers ativos: a API (Node.js) e o banco (MongoDB). Se a coluna `STATUS` mostrar `Up`, está tudo certo.

### Subir os containers (iniciar a aplicação)

```bash
docker compose up -d
```

### Parar os containers

```bash
docker compose down
```

Os dados do banco são preservados — apenas os containers são removidos.

### Reiniciar os containers

```bash
docker compose down && docker compose up -d
```

### Ver todos os containers (incluindo os parados)

```bash
docker ps -a
```

---

## 3. Atualizar a aplicação

Quando você fizer um `git push` de uma nova versão, siga este fluxo dentro do servidor:

```bash
# 1. Entrar na pasta do projeto
cd rotas-sz-bff

# 2. Baixar as alterações mais recentes do GitHub
git pull

# 3. Reconstruir a imagem da API com o novo código
docker compose build api

# 4. Reiniciar os containers com a nova imagem
docker compose up -d
```

---

## 4. Ver logs da aplicação

### Acompanhar os logs da API em tempo real

```bash
docker compose logs -f api
```

Pressione `Ctrl + C` para parar (os containers continuam rodando).

### Ver as últimas 50 linhas de log da API

```bash
docker compose logs --tail=50 api
```

### Ver logs do MongoDB

```bash
docker compose logs -f mongo
```

---

## 5. Banco de dados MongoDB

### Acessar o MongoDB pelo terminal (dentro do servidor)

```bash
docker exec -it rotas-sz-bff-mongo-1 mongosh
```

> Para confirmar o nome exato do container MongoDB, rode `docker ps` e olhe a coluna `NAMES`.

### Comandos básicos dentro do mongosh

```javascript
// Listar todos os bancos de dados
show dbs

// Selecionar o banco da aplicação
use rotas-sz

// Listar as coleções
show collections

// Ver documentos de uma coleção
db.pedidos.find().pretty()

// Sair
exit
```

### Acessar o MongoDB pelo MongoDB Compass (no Windows)

1. Baixe e instale o [MongoDB Compass](https://www.mongodb.com/try/download/compass).
2. Abra o Compass e cole a string de conexão:
   ```
   mongodb://54.198.39.78:27017
   ```
3. Clique em **Connect**.

> A porta `27017` precisa estar liberada no Security Group da AWS (`launch-wizard-1`).

---

## 6. URLs e portas de acesso externo

| Serviço               | Porta | URL / String de conexão             |
|-----------------------|-------|-------------------------------------|
| API / BFF (Node.js)   | 3001  | `http://54.198.39.78:3001`          |
| Banco de dados (MongoDB) | 27017 | `mongodb://54.198.39.78:27017`  |

### Testar se a API está respondendo (no PowerShell)

```powershell
Invoke-WebRequest -Uri "http://54.198.39.78:3001"
```

Ou simplesmente abra `http://54.198.39.78:3001` no navegador.

---

## Resolução de problemas comuns

### Erro "Bad permissions" ou "UNPROTECTED PRIVATE KEY FILE"

A chave `.pem` tem permissões abertas. Execute os comandos da seção [Primeira vez — ajustar permissão da chave](#primeira-vez--ajustar-permissão-da-chave) novamente no PowerShell como Administrador.

### PowerShell não reconhece o comando `ssh`

O cliente SSH nativo pode estar desativado. Para ativar:

1. Abra as **Configurações do Windows**.
2. Vá em **Aplicativos → Recursos opcionais**.
3. Clique em **Adicionar um recurso**.
4. Procure por **Cliente OpenSSH** e instale.

Reinicie o PowerShell após a instalação.

### Os containers não sobem / a API não responde

```bash
# Ver o status atual
docker ps -a

# Ver o log de erro
docker compose logs --tail=100 api
```

### O `git pull` pede usuário e senha (repositório privado)

Use um Personal Access Token do GitHub como senha:

1. No GitHub, vá em **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
2. Gere um token com permissão `repo`.
3. Quando o terminal pedir a senha, cole o token (não a senha da sua conta).

### Descobrir o nome exato dos containers

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Conexão SSH cai frequentemente (timeout)

Adicione a configuração de keep-alive criando (ou editando) o arquivo `C:\Users\seu-usuario\.ssh\config` no seu Windows:

```
Host 54.198.39.78
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

Isso envia um sinal a cada 60 segundos para manter a conexão ativa.
