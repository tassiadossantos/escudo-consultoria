

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

### Ambiente e Execução (Local e CI)

O backend exige `PORT` em runtime. O comportamento recomendado é:

- Local:
   - `pnpm dev` carrega o arquivo `.env` da raiz do monorepo via `dotenv-cli`
   - Defina `PORT` no `.env` ou use `pnpm exec cross-env PORT=3000 pnpm dev` quando quiser forçar um valor específico
- CI/Deploy:
   - Defina `PORT` explicitamente no job/ambiente antes de iniciar o processo

Exemplo de execução local com env explícito:

```sh
pnpm exec cross-env PORT=3000 pnpm dev
```

Exemplo de build no pacote:

```sh
pnpm build
```

Exemplo de validação de tipos:

```sh
pnpm typecheck
```

## Fila de Notificações & Worker

O backend publica eventos críticos (lead, consentimento, exclusão, erro) na tabela `notification_queue`.
Um worker processa essa fila e pode enviar notificações por e-mail, WhatsApp (Twilio), webhooks, etc.

### Como rodar o worker
```sh
node scripts/notification-worker.js
```

### Integração WhatsApp (Twilio)
1. Crie conta em [twilio.com/console](https://twilio.com/console) e ative o sandbox WhatsApp.
2. No seu `.env`:
   ```env
   TWILIO_SID=SEU_ACCOUNT_SID
   TWILIO_TOKEN=SEU_AUTH_TOKEN
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   TWILIO_WHATSAPP_TO=whatsapp:+55SEUNUMERO
   ```
3. Instale o pacote:
   ```sh
   pnpm add twilio
   ```
4. O worker já está preparado para enviar mensagens para o WhatsApp cadastrado.

## Segurança, LGPD e Auditoria
- Soft delete (deleted_at) em todas as entidades sensíveis
- Auditoria detalhada de exclusão (logs, webhook externo, fila)
- Endpoints DELETE protegidos por JWT (admin)
- Rastreabilidade total de consentimentos e leads

> Para detalhes completos de arquitetura, visão estratégica, roadmap e instruções avançadas, consulte o [README na raiz do projeto](../../README.md).
