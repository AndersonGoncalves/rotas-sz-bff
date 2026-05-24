# Deploy Manual — rotas-sz-bff

Nesta modalidade você instala e configura manualmente o Node.js, o MongoDB e o PM2 diretamente no servidor, sem usar Docker.

> Para a alternativa com Docker, consulte [deploy-docker.md](deploy-docker.md).

---

## Sumário

- [Linux](#linux)
- [Windows](#windows)

---

## Linux

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

#### 2.1 Liberar o MongoDB para acesso em rede

Por padrão, o MongoDB só aceita conexões vindas do próprio computador (`localhost`). Para que outros dispositivos na rede consigam se conectar — via Compass, Studio 3T ou outra máquina — é preciso alterar uma linha no arquivo de configuração.

Abra o arquivo de configuração do MongoDB:

```bash
sudo nano /etc/mongod.conf
```

Localize o bloco `net` (geralmente perto do fim do arquivo):

```yaml
net:
  port: 27017
  bindIp: 127.0.0.1
```

Altere `bindIp` para `0.0.0.0` (aceitar conexões de qualquer endereço):

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0
```

Salve o arquivo (`Ctrl+O`, Enter, `Ctrl+X`) e reinicie o MongoDB:

```bash
sudo systemctl restart mongod
```

Confirme que voltou a rodar:

```bash
sudo systemctl status mongod
```

> **Atenção:** `0.0.0.0` é seguro em rede local fechada. Se o servidor estiver exposto à internet, use o IP específico da interface de rede em vez de `0.0.0.0`, ou configure autenticação no MongoDB.

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

## Windows

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

#### 2.1 Liberar o MongoDB para acesso em rede

Por padrão, o MongoDB só aceita conexões vindas do próprio computador (`localhost`). Para que outros dispositivos na rede consigam se conectar — via Compass, Studio 3T ou outra máquina — é preciso alterar uma linha no arquivo de configuração.

Abra o **Bloco de Notas como administrador** (clique com o botão direito no Bloco de Notas e escolha "Executar como administrador") e abra o arquivo:

```
C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg
```

Localize o bloco `net`:

```yaml
net:
  port: 27017
  bindIp: 127.0.0.1
```

Altere `bindIp` para `0.0.0.0` (aceitar conexões de qualquer endereço):

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0
```

Salve o arquivo e reinicie o serviço do MongoDB no PowerShell (como administrador):

```powershell
Restart-Service -Name MongoDB
```

Confirme que voltou a rodar:

```powershell
Get-Service -Name MongoDB
```

O campo `Status` deve mostrar `Running`.

> **Atenção:** `0.0.0.0` é seguro em rede local fechada. Se o servidor estiver exposto à internet, use o IP específico da interface de rede em vez de `0.0.0.0`, ou configure autenticação no MongoDB.

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
