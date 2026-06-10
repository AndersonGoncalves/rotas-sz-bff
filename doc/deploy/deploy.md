# Deploy — rotas-sz-bff

Este guia cobre duas formas de colocar o projeto em produção, cada uma descrita para **Linux** e **Windows**.

---

## Opções disponíveis

### [Deploy Manual](deploy-manual.md)

Instala e configura Node.js, MongoDB e PM2 diretamente no servidor, sem Docker.

- Recomendado para: VPS simples ou servidores sem suporte a Docker.
- O que instalar: Node.js + MongoDB + PM2.

### [Deploy com Docker](deploy-docker.md)

Usa Docker Compose para subir a API e o MongoDB em containers isolados com um único comando.

- Recomendado para: a maioria dos casos — Windows ou Linux.
- O que instalar: apenas o Docker Desktop.

---

## Resumo Comparativo

|                      | Manual (Linux)                       | Manual (Windows)  | Docker (Linux)                    | Docker (Windows)          |
| -------------------- | ------------------------------------ | ----------------- | --------------------------------- | ------------------------- |
| O que instalar       | Node + MongoDB + PM2                 | Node + MongoDB + PM2 | Só o Docker                    | Docker Desktop            |
| Portabilidade        | Depende do SO                        | Depende do SO     | Alta                              | Alta                      |
| Dados do banco       | Na máquina                           | Na máquina        | Volume Docker                     | Volume Docker             |
| Reinicia no boot     | PM2 startup                          | PM2 + serviço     | `restart: unless-stopped`         | `restart: unless-stopped` |
| Atualizar versão     | `git pull` + `tsc` + `pm2 restart`   | igual Linux       | `docker compose up --build -d`    | igual Linux               |
| Complexidade inicial | Média                                | Média             | Baixa                             | Média (WSL2)              |
| Recomendado para     | VPS simples                          | Servidor Windows  | Produção                          | Dev/Produção Windows      |
