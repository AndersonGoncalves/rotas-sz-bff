# Comandos Linux — Operação de máquina

## Navegação

```bash
pwd                  # Mostra a pasta atual (print working directory)
ls                    # Lista arquivos da pasta
ls -la                # Lista com detalhes e arquivos ocultos
cd nome-da-pasta      # Entra em uma pasta
cd ..                 # Volta uma pasta
cd ../..              # Volta duas pastas
cd ~                  # Vai para a pasta home do usuário
cd -                  # Volta para a pasta anterior
```

## Arquivos e pastas

```bash
mkdir nome-da-pasta           # Cria uma pasta
mkdir -p a/b/c                 # Cria pastas aninhadas de uma vez
touch arquivo.txt              # Cria um arquivo vazio

cp origem.txt destino.txt      # Copia um arquivo
cp -r pasta-origem pasta-destino  # Copia uma pasta inteira

mv origem.txt destino.txt      # Move ou renomeia um arquivo/pasta

rm arquivo.txt                 # Apaga um arquivo
rm -r pasta                    # Apaga uma pasta com conteúdo
rm -rf pasta                   # Apaga forçado, sem confirmação (cuidado!)
rmdir pasta                    # Apaga pasta vazia

find . -name "*.js"            # Busca arquivos por nome/padrão
```

## Ver conteúdo de arquivos

```bash
cat arquivo.txt        # Mostra o conteúdo inteiro
less arquivo.txt        # Mostra com rolagem (q para sair)
head arquivo.txt        # Mostra as 10 primeiras linhas
head -n 50 arquivo.txt  # Mostra as 50 primeiras linhas
tail arquivo.txt        # Mostra as 10 últimas linhas
tail -f arquivo.log     # Acompanha o arquivo em tempo real (logs)
```

## Permissões e dono dos arquivos

```bash
chmod +x script.sh          # Torna um arquivo executável
chmod 755 arquivo           # Define permissões (rwx dono, rx grupo, rx outros)
chown usuario:grupo arquivo # Muda o dono/grupo do arquivo
sudo comando                 # Executa um comando como administrador
```

## Processos

```bash
ps aux                  # Lista todos os processos rodando
ps aux | grep node       # Filtra processos por nome
top                       # Monitor de processos em tempo real (uso de CPU/memória)
htop                     # Igual ao top, mas mais visual (precisa instalar)
kill PID                 # Encerra um processo pelo ID
kill -9 PID              # Força o encerramento de um processo
```

## Disco e memória

```bash
df -h            # Espaço em disco (uso por partição, formato legível)
du -sh pasta      # Tamanho total de uma pasta
free -h          # Memória RAM disponível/usada
```

## Rede

```bash
ping google.com          # Testa conectividade com um host
curl https://exemplo.com # Faz uma requisição HTTP
ip a                     # Mostra os IPs da máquina
netstat -tulnp           # Mostra portas abertas e serviços escutando
ss -tulnp                # Alternativa moderna ao netstat
```

## Pacotes (Ubuntu/Debian)

```bash
sudo apt-get update              # Atualiza a lista de pacotes disponíveis
sudo apt-get upgrade             # Atualiza os pacotes instalados
sudo apt-get install nome-pacote # Instala um pacote
sudo apt-get remove nome-pacote  # Remove um pacote
```

## Variáveis de ambiente

```bash
echo $VARIAVEL                        # Mostra o valor de uma variável
export VARIAVEL=valor                  # Define uma variável (só na sessão atual)
echo 'export VARIAVEL=valor' >> ~/.bashrc  # Define permanente
source ~/.bashrc                       # Recarrega o arquivo de configuração
```

## Compactação

```bash
tar -czvf pasta.tar.gz pasta/   # Compacta uma pasta
tar -xzvf pasta.tar.gz          # Descompacta
zip -r pasta.zip pasta/         # Compacta em .zip
unzip pasta.zip                 # Descompacta .zip
```

## SSH e transferência remota

```bash
ssh usuario@ip-da-maquina             # Conecta em uma máquina remota
scp arquivo.txt usuario@ip:/caminho/   # Copia arquivo para a máquina remota
scp usuario@ip:/caminho/arquivo.txt .  # Copia arquivo da máquina remota para a local
```

## Histórico e atalhos úteis

```bash
history               # Mostra o histórico de comandos digitados
!!                     # Repete o último comando
clear                  # Limpa a tela do terminal
Ctrl + C               # Cancela o comando em execução
Ctrl + Z                # Suspende o processo atual
Ctrl + R                # Busca no histórico de comandos
```

## Docker (uso comum no projeto)

```bash
docker compose build api     # Builda a imagem de um serviço
docker compose up -d          # Sobe os containers em background
docker compose down           # Derruba os containers
docker compose logs -f api    # Acompanha os logs do serviço em tempo real
docker ps                     # Lista containers rodando
docker exec -it nome-container bash  # Entra no terminal do container
```
