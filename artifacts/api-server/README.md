
# Backend — API Server

Este diretório contém o backend (API server) da Plataforma Digital SST.

## Como rodar

1. Instale as dependências na raiz do monorepo:
   ```sh
   pnpm install
   ```
2. Entre na pasta do backend:
   ```sh
   cd artifacts/api-server
   ```
3. Rode o servidor na porta desejada (exemplo: 3000):
   ```sh
   pnpm exec cross-env PORT=3000 pnpm dev
   ```
   - Acesse: http://localhost:3000/

> Para detalhes completos de arquitetura, visão estratégica, roadmap e instruções avançadas, consulte o [README na raiz do projeto](../../README.md).
