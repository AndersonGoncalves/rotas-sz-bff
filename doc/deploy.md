# Deploy — rotas-sz-bff

Este guia cobre duas formas de colocar o projeto em produção: **deploy manual** e **deploy com Docker**. Cada opção é descrita para **Linux** e **Windows**.

---

## Sumário

- [Opção 1 — Deploy Manual](#opção-1--deploy-manual)
  - [Linux](#linux)
  - [Windows](#windows)
- [Opção 2 — Docker](#opção-2--docker)
  - [Preparar os arquivos do projeto](#preparar-os-arquivos-do-projeto)
  - [Linux](#linux-1)
  - [Windows](#windows-1)
  - [Rodar com Docker Compose](#rodar-com-docker-compose)
- [Resumo Comparativo](#resumo-comparativo)

---

## Opção 1 — Deploy Manual

### Linux

#### 1. Instalar o Node.js via nvm

O `nvm` (Node Version Manager) é a forma recomendada de instalar o Node.js no Linux por permitir trocar de versão facilmente.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts

# Verificar instalação
node -v
npm -v
```

#### 2. Instalar o MongoDB

```bash
# Importar a chave GPG do MongoDB
sudo apt install -y gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Adicionar o repositório
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Instalar
sudo apt update && sudo apt install -y mongodb-org

# Iniciar e habilitar no boot
sudo systemctl enable --now mongod

# Verificar status
sudo systemctl status mongod
```

#### 3. Copiar os arquivos do projeto

Copie **apenas o código-fonte** — nunca copie `node_modules/` nem `dist/`, pois serão gerados no servidor.

**Via Git (recomendado):**

```bash
git clone https://github.com/seu-usuario/rotas-sz-bff.git
cd rotas-sz-bff
```

**Via SCP (cópia direta de outra máquina):**

```bash
# Rode esse comando na máquina de origem
scp -r ./rotas-sz-bff usuario@IP-DO-SERVIDOR:~/
```

Arquivos que devem estar presentes no servidor:

```
rotas-sz-bff/
├── src/
├── main.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

#### 4. Instalar dependências e compilar

```bash
cd rotas-sz-bff
npm install
npx tsc
```

#### 5. Criar o arquivo .env

```bash
cat > .env << 'EOF'
SERVER_PORT=3001
DB_URL=mongodb://localhost:27017/rotas-sz
EOF
```

#### 6. Testar se o servidor sobe

```bash
node dist/main.js
```

O terminal deve exibir:

```
[DB] Conectado ao MongoDB: mongodb://localhost:27017/rotas-sz
[Server] rotas-sz-bff rodando na porta 3001
```

Pressione `Ctrl+C` para parar — agora configure o PM2 para manter o processo rodando.

#### 7. Manter em segundo plano com PM2

Sem PM2, o app para quando você fechar o terminal.

```bash
npm install -g pm2

# Iniciar a aplicação
pm2 start dist/main.js --name rotas-sz-bff

# Salvar a lista de processos
pm2 save

# Configurar para iniciar no boot
pm2 startup
# O comando acima exibe um comando para você executar — copie e execute-o
```

Comandos úteis do PM2:

```bash
pm2 list                        # lista os processos rodando
pm2 logs rotas-sz-bff           # exibe os logs em tempo real
pm2 restart rotas-sz-bff        # reinicia o processo
pm2 stop rotas-sz-bff           # para o processo
pm2 delete rotas-sz-bff         # remove da lista do PM2
```

#### 8. Liberar a porta no firewall (se necessário)

```bash
sudo ufw allow 3001
sudo ufw status
```

---

### Windows

#### 1. Instalar o Node.js

Acesse [nodejs.org](https://nodejs.org) e baixe o instalador LTS (`.msi`). Execute o instalador com as opções padrão.

Verifique a instalação no **Prompt de Comando** ou **PowerShell**:

```powershell
node -v
npm -v
```

> **Alternativa via winget:**
> ```powershell
> winget install OpenJS.NodeJS.LTS
> ```

#### 2. Instalar o MongoDB

Acesse [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community), selecione **Windows**, baixe o instalador `.msi` e execute.

Durante a instalação:
- Marque **"Install MongoDB as a Service"** — isso faz o MongoDB iniciar automaticamente com o Windows.
- Marque **"Install MongoDB Compass"** (opcional) — interface gráfica para visualizar os dados.

Verifique no PowerShell:

```powershell
mongosh
```

> Se o comando não for encontrado, adicione o caminho do MongoDB ao PATH:
> `C:\Program Files\MongoDB\Server\7.0\bin`

#### 3. Copiar os arquivos do projeto

**Via Git (recomendado):**

Instale o Git em [git-scm.com](https://git-scm.com) e execute no PowerShell:

```powershell
git clone https://github.com/seu-usuario/rotas-sz-bff.git
cd rotas-sz-bff
```

**Via cópia manual:**

Copie a pasta do projeto para o servidor. Certifique-se de incluir:

```
rotas-sz-bff\
├── src\
├── main.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

> Não copie as pastas `node_modules\` nem `dist\`.

#### 4. Instalar dependências e compilar

Abra o PowerShell na pasta do projeto:

```powershell
npm install
npx tsc
```

#### 5. Criar o arquivo .env

```powershell
@"
SERVER_PORT=3001
DB_URL=mongodb://localhost:27017/rotas-sz
"@ | Out-File -FilePath .env -Encoding utf8
```

Ou crie manualmente um arquivo `.env` na raiz do projeto com o conteúdo:

```env
SERVER_PORT=3001
DB_URL=mongodb://localhost:27017/rotas-sz
```

#### 6. Testar se o servidor sobe

```powershell
node dist\main.js
```

#### 7. Manter em segundo plano com PM2

```powershell
npm install -g pm2

pm2 start dist/main.js --name rotas-sz-bff
pm2 save

# Configurar para iniciar com o Windows
pm2 startup
# Execute o comando que for exibido
```

> No Windows, o PM2 usa o módulo `pm2-installer` para criar um serviço do Windows. Caso o `pm2 startup` não funcione, instale com:
> ```powershell
> npm install -g pm2-windows-startup
> pm2-startup install
> ```

#### 8. Liberar a porta no firewall do Windows

Abra o **Windows Defender Firewall** > **Regras de Entrada** > **Nova Regra**:
- Tipo: **Porta**
- Protocolo: **TCP**
- Porta: `3001`
- Ação: **Permitir a conexão**

Ou via PowerShell (como administrador):

```powershell
New-NetFirewallRule -DisplayName "rotas-sz-bff" -Direction Inbound -Protocol TCP -LocalPort 3001 -Action Allow
```

---

## Opção 2 — Docker

Docker empacota a aplicação + Node.js + todas as dependências em uma **imagem** isolada. O servidor só precisa ter o Docker instalado — não é necessário instalar Node.js nem MongoDB separadamente.

### Preparar os arquivos do projeto

Crie os dois arquivos abaixo na raiz do projeto antes de rodar o Docker.

#### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc

EXPOSE 3001

CMD ["node", "dist/main.js"]
```

#### docker-compose.yml

```yaml
services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      SERVER_PORT: 3001
      DB_URL: mongodb://mongo:27017/rotas-sz
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

volumes:
  mongo_data:
```

> O `volumes: mongo_data` garante que os dados do banco **persistem** mesmo se o container for recriado ou atualizado.
>
> O `restart: unless-stopped` faz os containers reiniciarem automaticamente após reinicialização do servidor.

---

### Linux

#### 1. Instalar o Docker

```bash
curl -fsSL https://get.docker.com | sh

# Permitir rodar Docker sem sudo
sudo usermod -aG docker $USER

# Reconecte ao terminal (ou rode o comando abaixo para aplicar sem reconectar)
newgrp docker

# Verificar
docker -v
docker compose version
```

#### 2. Copiar os arquivos do projeto

```bash
# Via Git
git clone https://github.com/seu-usuario/rotas-sz-bff.git
cd rotas-sz-bff
```

Certifique-se de que o `Dockerfile` e o `docker-compose.yml` estão na raiz do projeto.

#### 3. Criar o .env (opcional)

O `docker-compose.yml` já define as variáveis de ambiente diretamente. Se quiser usar um `.env` separado, crie o arquivo:

```bash
cat > .env << 'EOF'
SERVER_PORT=3001
DB_URL=mongodb://mongo:27017/rotas-sz
EOF
```

E ajuste o `docker-compose.yml` para usar `env_file`:

```yaml
services:
  api:
    build: .
    env_file:
      - .env
```

#### 4. Subir os containers

```bash
docker compose up -d
```

O `-d` (detached) roda em segundo plano.

#### 5. Liberar a porta no firewall

```bash
sudo ufw allow 3001
```

---

### Windows

#### 1. Instalar o Docker Desktop

Acesse [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) e baixe o instalador para Windows.

Durante a instalação:
- Deixe marcada a opção **"Use WSL 2 instead of Hyper-V"** (recomendado).
- Se solicitado, instale o **WSL 2** seguindo o link que o instalador fornecer.

Após a instalação, **reinicie o computador** e abra o Docker Desktop. Aguarde o ícone da baleia na bandeja ficar estável (verde).

Verifique no PowerShell:

```powershell
docker -v
docker compose version
```

#### 2. Copiar os arquivos do projeto

```powershell
git clone https://github.com/seu-usuario/rotas-sz-bff.git
cd rotas-sz-bff
```

Certifique-se de que o `Dockerfile` e o `docker-compose.yml` estão na raiz do projeto.

#### 3. Subir os containers

Abra o PowerShell na pasta do projeto:

```powershell
docker compose up -d
```

O Docker Desktop irá baixar as imagens necessárias (`node:20-alpine` e `mongo:7`) e construir a imagem da API automaticamente.

Você pode acompanhar os containers rodando pela interface gráfica do **Docker Desktop** ou pelo terminal.

#### 4. Liberar a porta no firewall do Windows

```powershell
# Execute como administrador
New-NetFirewallRule -DisplayName "rotas-sz-bff" -Direction Inbound -Protocol TCP -LocalPort 3001 -Action Allow
```

---

### Rodar com Docker Compose

Os comandos abaixo funcionam igualmente no Linux e no Windows (PowerShell).

```bash
# Subir todos os containers em segundo plano
docker compose up -d

# Ver logs em tempo real da API
docker compose logs -f api

# Ver status dos containers
docker compose ps

# Parar os containers (sem remover os dados)
docker compose stop

# Parar e remover os containers (dados do banco permanecem no volume)
docker compose down

# Reconstruir a imagem após alterar o código e reiniciar
docker compose up --build -d

# Remover tudo incluindo o volume do banco (APAGA OS DADOS)
docker compose down -v
```

> **Atualizar a aplicação** após uma mudança no código:
> ```bash
> git pull
> docker compose up --build -d
> ```
> O `--build` força a reconstrução da imagem com o código atualizado.

---

## Resumo Comparativo

|                        | Manual (Linux) | Manual (Windows) | Docker (Linux) | Docker (Windows)       |
| ---------------------- | -------------- | ---------------- | -------------- | ---------------------- |
| O que instalar         | Node + MongoDB + PM2 | Node + MongoDB + PM2 | Só o Docker | Docker Desktop         |
| Portabilidade          | Depende do SO  | Depende do SO    | Alta           | Alta                   |
| Dados do banco         | Na máquina     | Na máquina       | Volume Docker  | Volume Docker          |
| Reinicia no boot       | PM2 startup    | PM2 + serviço    | `restart: unless-stopped` | `restart: unless-stopped` |
| Atualizar versão       | `git pull` + `tsc` + `pm2 restart` | igual Linux | `docker compose up --build -d` | igual Linux |
| Complexidade inicial   | Média          | Média            | Baixa          | Média (WSL2)           |
| Recomendado para       | VPS simples    | Servidor Windows | Produção       | Dev/Produção Windows   |
