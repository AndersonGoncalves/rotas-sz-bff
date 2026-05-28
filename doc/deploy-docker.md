# Deploy com Docker — rotas-sz-bff

Docker empacota a aplicação + Node.js + todas as dependências em uma **imagem** isolada. O servidor só precisa ter o Docker instalado — não é necessário instalar Node.js nem MongoDB separadamente.

> Para a alternativa sem Docker, consulte [deploy-manual.md](deploy-manual.md).

> **Como funciona resumidamente:**
> 1. Você cria dois arquivos de configuração na raiz do projeto (`Dockerfile` e `docker-compose.yml`).
> 2. O Docker lê esses arquivos e monta tudo automaticamente.
> 3. Um único comando sobe a API e o banco de dados juntos.

---

## Sumário

- [Preparar os arquivos do projeto](#preparar-os-arquivos-do-projeto)
- [Linux](#linux)
- [Windows](#windows)
- [Comandos úteis com Docker Compose](#comandos-úteis-com-docker-compose)
- [O que fazer se o computador travar ou reiniciar](#o-que-fazer-se-o-computador-travar-ou-reiniciar)
- [Acessar o banco de dados com uma interface gráfica](#acessar-o-banco-de-dados-com-uma-interface-gráfica)

---

## Preparar os arquivos do projeto

### Passo 1 — Criar o Dockerfile

O `Dockerfile` é um **script de instruções** que o Docker usa para montar a imagem da sua aplicação. Você não executa esse arquivo manualmente — o Docker o lê quando você rodar o comando de build.

Crie o arquivo `Dockerfile` (sem extensão) na raiz do projeto com o seguinte conteúdo:

```dockerfile
# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc

# Stage 2: produção (sem devDependencies)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main.js"]
```

> **Você não executa essas linhas no terminal.** O Docker as lê automaticamente ao construir a imagem.

---

### Passo 2 — Criar o docker-compose.yml

O `docker-compose.yml` define **quais containers rodar** e como eles se conectam entre si. Neste caso, serão dois: a API e o MongoDB.

Crie o arquivo `docker-compose.yml` na raiz do projeto:

```yaml
services:
  api:
    build: .          # usa o Dockerfile que você criou no Passo 1
    ports:
      - "3001:3001"   # expõe a porta 3001 para fora do container
    environment:
      SERVER_PORT: 3001
      DB_URL: mongodb://mongo:27017/rotas-sz
    depends_on:
      mongo:
        condition: service_healthy
    restart: unless-stopped

  mongo:
    image: mongo:7    # baixa a imagem oficial do MongoDB
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db   # salva os dados fora do container
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongo_data:   # volume nomeado: dados persistem mesmo se o container for recriado
```

> `restart: unless-stopped` faz os containers reiniciarem automaticamente se o servidor for reiniciado.

---

## Linux

#### 1. Instalar o Docker

**1.1 — Instalar o Docker Engine**

Remova versões antigas caso existam:

```bash
sudo apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null; true
```

Adicione o repositório oficial do Docker:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Instale o Docker:

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Habilite o serviço para iniciar junto com o sistema:

```bash
sudo systemctl enable --now docker
```

Permita rodar o Docker sem `sudo` e aplique sem precisar reconectar:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verifique a instalação:

```bash
docker -v
docker compose version
```

---

**1.2 — Instalar o Docker Desktop (interface gráfica)**

O Docker Desktop oferece uma interface gráfica para gerenciar containers, imagens e volumes, similar ao que está disponível no Windows.

Baixe o pacote `.deb` mais recente:

```bash
# Verifique a versão mais recente em https://docs.docker.com/desktop/release-notes/
curl -Lo /tmp/docker-desktop.deb \
  "https://desktop.docker.com/linux/main/amd64/docker-desktop-amd64.deb"
```

Instale:

```bash
sudo apt install -y /tmp/docker-desktop.deb
```

Inicie o Docker Desktop:

```bash
systemctl --user start docker-desktop
```

Para abrir a interface, procure **Docker Desktop** no menu de aplicativos do Ubuntu, ou execute:

```bash
docker desktop
```

> O Docker Desktop no Linux requer que o Docker Engine já esteja instalado (passo 1.1). Ele inicia um contexto separado (`desktop-linux`) e exibe containers, imagens e volumes em uma interface visual.

Para que o Docker Desktop inicie automaticamente com o sistema:

```bash
systemctl --user enable docker-desktop
```

---

**1.3 — Resolver erro de KVM (se o Docker Desktop não abrir)**

O Docker Desktop no Linux exige suporte a KVM (virtualização de hardware). Se ao iniciar aparecer a mensagem *"KVM is not enabled on host"*, siga os passos abaixo.

Verifique se a CPU suporta virtualização (resultado deve ser maior que 0):

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

Carregue o módulo KVM — use `kvm_intel` para processadores Intel ou `kvm_amd` para AMD:

```bash
sudo modprobe kvm_intel
```

Confirme que o dispositivo foi criado:

```bash
ls /dev/kvm
```

Adicione seu usuário ao grupo `kvm`:

```bash
sudo usermod -aG kvm $USER
```

Torne o módulo persistente para que carregue automaticamente no boot:

```bash
echo "kvm_intel" | sudo tee /etc/modules-load.d/kvm.conf
```

Reinicie o Docker Desktop:

```bash
systemctl --user restart docker-desktop
```

> Se o comando `modprobe kvm_intel` retornar erro mesmo com a CPU compatível, a virtualização (VT-x/AMD-V) pode estar desabilitada na BIOS/UEFI. Reinicie o computador, entre na BIOS e habilite a opção **Intel Virtualization Technology** (ou **SVM Mode** em AMD).

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

Sempre que fizer alterações no código, reconstrua a imagem com:

```bash
docker compose up -d --build
```

#### 5. Liberar a porta no firewall

```bash
sudo ufw allow 3001
```

---

## Windows

#### 1. Preparar o computador (Git + Docker Desktop)

O computador precisa ter dois programas instalados antes de qualquer coisa: **Git** (para baixar o projeto) e **Docker Desktop** (para rodar a aplicação). Siga os passos abaixo na ordem.

---

**1.1 — Instalar o Git**

O Git é o programa que permite baixar o código do projeto do GitHub.

1. Acesse [git-scm.com/download/win](https://git-scm.com/download/win) e o download iniciará automaticamente.
2. Execute o instalador. Pode clicar em **Next** em todas as telas sem alterar nada — as opções padrão já são as corretas.
3. Ao final, clique em **Finish**.

Para confirmar que o Git foi instalado, abra o **PowerShell** (pressione `Win + R`, digite `powershell` e pressione Enter) e execute:

```powershell
git --version
```

Se aparecer algo como `git version 2.x.x`, está funcionando.

---

**1.2 — Instalar o Docker Desktop**

O Docker Desktop é o programa que vai criar e rodar os containers da aplicação.

1. Acesse [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) e clique em **Download for Windows**.
2. Execute o instalador.
3. Durante a instalação, deixe marcada a opção **"Use WSL 2 instead of Hyper-V"** (recomendado).
4. Se o instalador solicitar a instalação do **WSL 2**, clique no link fornecido e siga as instruções da Microsoft (é uma atualização do Windows necessária para o Docker funcionar).
5. Ao final, clique em **Close and restart** para reiniciar o computador.

Após reiniciar, abra o **Docker Desktop** pelo menu Iniciar. Aguarde até o ícone da baleia na bandeja do sistema (canto inferior direito) ficar estável — isso indica que o Docker está pronto.

Para confirmar que o Docker foi instalado corretamente, abra o PowerShell e execute:

```powershell
docker -v
docker compose version
```

Se ambos os comandos mostrarem versões, está tudo certo.

---

#### 2. Baixar os arquivos do projeto

Agora que o Git está instalado, você pode baixar o projeto do GitHub. No PowerShell, execute:

```powershell
git clone https://github.com/seu-usuario/rotas-sz-bff.git
cd rotas-sz-bff
```

- O primeiro comando (`git clone`) baixa todos os arquivos do projeto para uma pasta chamada `rotas-sz-bff`.
- O segundo comando (`cd rotas-sz-bff`) entra nessa pasta.

Certifique-se de que o `Dockerfile` e o `docker-compose.yml` estão na raiz do projeto.

#### 3. Subir os containers

Este passo vai iniciar a aplicação. O comando abaixo instrui o Docker a ler o arquivo `docker-compose.yml` do projeto e criar/iniciar todos os containers necessários (a API e o banco de dados MongoDB) em segundo plano.

Certifique-se de que o PowerShell está aberto **dentro da pasta do projeto** (você deve ter feito isso no passo anterior com o `cd rotas-sz-bff`). O caminho no terminal deve terminar com `rotas-sz-bff`, assim:

```
PS C:\Users\seu-usuario\rotas-sz-bff>
```

Agora digite o comando abaixo e pressione **Enter**:

```powershell
docker compose up -d
```

O que cada parte significa:
- `docker compose` — chama o Docker para gerenciar os containers.
- `up` — cria e inicia os containers.
- `-d` — roda em segundo plano (você continua usando o terminal normalmente enquanto a aplicação roda).

Na primeira vez, o Docker irá baixar as imagens necessárias (`node:20-alpine` e `mongo:7`) — isso pode demorar alguns minutos dependendo da internet. Nas próximas vezes será muito mais rápido.

Ao final, você verá uma saída parecida com esta, indicando que os containers foram criados com sucesso:

```
✔ Container rotas-sz-bff-mongo-1  Started
✔ Container rotas-sz-bff-api-1    Started
```

Sempre que fizer alterações no código, reconstrua a imagem com:

```powershell
docker compose up -d --build
```

O `--build` reconstrói a imagem da API com o código atualizado. O MongoDB não é afetado e os dados são preservados.

Você pode acompanhar os containers rodando pela interface gráfica do **Docker Desktop** ou pelo terminal.

#### 4. Liberar a porta no firewall do Windows

Para que outros dispositivos da rede consigam acessar a aplicação, o Windows precisa permitir conexões na porta `3001`. Abra o PowerShell **como administrador** (clique com o botão direito no PowerShell e escolha "Executar como administrador") e execute:

```powershell
New-NetFirewallRule -DisplayName "rotas-sz-bff" -Direction Inbound -Protocol TCP -LocalPort 3001 -Action Allow
```

---

#### 5. Acessar a aplicação

Após os passos 3 e 4, sua aplicação já está no ar e acessível por outros dispositivos na mesma rede.

Para saber o IP do computador onde a aplicação está rodando, execute no PowerShell:

```powershell
ipconfig
```

Procure pelo campo **Endereço IPv4** (exemplo: `192.168.1.100`).

Agora, de qualquer dispositivo na mesma rede (celular, notebook, etc.), acesse no navegador:

```
http://192.168.1.100:3001
```

> Substitua `192.168.1.100` pelo IP que apareceu no `ipconfig`.

Se a API responder, a aplicação está funcionando corretamente.

---

## Comandos úteis com Docker Compose

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

#### Atualizar a aplicação após uma mudança no código

Sempre que uma nova versão do projeto for publicada no GitHub (por você ou por outra pessoa), siga este processo no computador onde a aplicação está rodando:

**1 — Abra o PowerShell e entre na pasta do projeto:**

```powershell
cd rotas-sz-bff
```

**2 — Baixe as alterações do GitHub:**

```powershell
git pull
```

Este comando sincroniza os arquivos locais com o que está no repositório remoto. Se não houver nada novo, ele dirá `Already up to date.`

**3 — Reconstrua e reinicie os containers com o código atualizado:**

```powershell
docker compose up --build -d
```

O `--build` faz o Docker recompilar a imagem da API com o novo código antes de reiniciar. Sem ele, o Docker subiria a versão antiga.

Após o comando terminar, a aplicação já estará rodando com a versão mais recente. Não é necessário reiniciar o computador nem parar os containers manualmente antes — o comando cuida disso.

---

## O que fazer se o computador travar ou reiniciar

### Reinicialização normal

Não é necessário fazer nada. Os containers estão configurados com a política `restart: unless-stopped`, o que significa que o Docker os reinicia automaticamente sempre que o computador for ligado ou reiniciado.

Após o boot, aguarde alguns segundos para o Docker Desktop inicializar e os containers subirem. Você pode confirmar que estão rodando com:

```powershell
docker compose ps
```

A coluna `Status` deve mostrar `Up` para os dois serviços (`api` e `mongo`).

### Quando os containers NÃO sobem automaticamente

A única situação em que os containers **não** reiniciam sozinhos é se você os parou manualmente com:

```powershell
docker compose stop
```

Nesse caso, o Docker entende que foi uma parada intencional. Para subir novamente:

```powershell
docker compose up -d
```

### Se a aplicação não responder após reiniciar

Verifique o status dos containers:

```powershell
docker compose ps
```

Se algum aparecer como `Exited` ou `Restarting`, veja os logs para entender o problema:

```powershell
docker compose logs api
docker compose logs mongo
```

Se necessário, force uma reinicialização dos containers:

```powershell
docker compose restart
```

> Os dados do banco **não são perdidos** em nenhum desses cenários — eles ficam salvos no volume `mongo_data`, fora dos containers.

---

## Acessar o banco de dados com uma interface gráfica

Com a aplicação rodando via Docker Compose, o MongoDB fica acessível na porta `27017` do computador onde os containers estão. Você pode conectar qualquer cliente gráfico — como **MongoDB Compass** (gratuito, oficial) ou **Studio 3T** — para visualizar e editar os dados diretamente.

### Onde os dados ficam armazenados fisicamente

Os dados do banco **não ficam dentro do container** — se o container for removido, os dados não são perdidos. Eles ficam em um **volume Docker** chamado `mongo_data`, gerenciado pelo próprio Docker Desktop.

**No Windows**, esse volume fica dentro do disco virtual do WSL 2. Você pode acessá-lo pelo Explorer colando o caminho abaixo na barra de endereço:

```
\\wsl$\docker-desktop-data\data\docker\volumes\rotas-sz-bff_mongo_data\_data
```

**No Linux**, o caminho físico é:

```
/var/lib/docker/volumes/rotas-sz-bff_mongo_data/_data
```

> Na prática, você não precisa acessar essa pasta diretamente — use o MongoDB Compass ou Studio 3T para visualizar e editar os dados. A pasta existe para garantir que os dados **sobrevivam a reinicializações e atualizações** dos containers.

---

### Dados de conexão

| Campo        | Valor                     |
| ------------ | ------------------------- |
| Host         | `localhost` (se for o próprio computador) ou o IP da máquina na rede (ex: `192.168.1.100`) |
| Porta        | `27017`                   |
| Banco        | `rotas-sz`                |
| Autenticação | Nenhuma (sem usuário/senha) |

### MongoDB Compass

1. Baixe e instale em [mongodb.com/products/compass](https://www.mongodb.com/products/compass).
2. Abra o Compass. Na tela inicial, você verá um campo de **Connection String**.
3. Se estiver acessando do próprio computador onde o Docker roda, use:
   ```
   mongodb://localhost:27017
   ```
   Se estiver acessando de outro computador na rede, substitua `localhost` pelo IP da máquina (ex: `mongodb://192.168.1.100:27017`).
4. Clique em **Connect**.
5. O banco `rotas-sz` aparecerá na lista à esquerda.

### Studio 3T

1. Abra o Studio 3T e clique em **New Connection**.
2. Escolha a aba **From URI** e cole:
   ```
   mongodb://localhost:27017
   ```
   (ou substitua `localhost` pelo IP se for de outro computador).
3. Clique em **Test Connection** para verificar, depois em **Save** e em **Connect**.
4. O banco `rotas-sz` estará disponível na árvore de conexões.

> **Importante:** essa configuração não tem senha, o que é adequado para uso interno em rede local. Nunca exponha a porta `27017` para a internet sem adicionar autenticação.
