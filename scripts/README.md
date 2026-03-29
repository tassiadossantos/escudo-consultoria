# Notification Worker (scripts/notification-worker.js)

## Visão Geral

O worker processa eventos da fila `notification_queue` para automação de notificações (WhatsApp, e-mail, webhooks, etc.), garantindo rastreabilidade, retry e integração com múltiplos canais.

## Como Funciona

1. **Fila de eventos:**
   - Toda ação relevante (lead, consentimento, exclusão, erro) publica um evento na tabela `notification_queue`.
2. **Worker:**
   - O script `notification-worker.js` consome eventos pendentes, processa e envia notificações.
   - Suporta múltiplos canais (WhatsApp via Twilio, e-mail, webhooks externos).
   - Atualiza status do evento (pending, sent, failed, retry).
3. **Retry e rastreabilidade:**
   - Eventos com erro são reprocessados automaticamente.
   - Logs detalhados e status para auditoria e troubleshooting.

## Configuração

- Defina variáveis no `.env`:
  - `DATABASE_URL` (Postgres/Supabase)
  - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` (para WhatsApp)
  - `WEBHOOK_URL` (opcional)

## Execução

```sh
pnpm tsx scripts/notification-worker.js
```

## Exemplo de Payload

```json
{
  "type": "whatsapp",
  "to": "+5511999999999",
  "message": "Olá, seu cadastro foi recebido!"
}
```

## Integração Twilio/WhatsApp
- Configure as variáveis de ambiente do Twilio.
- O worker envia mensagens via WhatsApp automaticamente para eventos do tipo `whatsapp`.

## Auditoria e LGPD
- Todos os eventos são rastreados.
- Exclusões LGPD publicam evento e disparam webhook externo.

---

**Mantenha este README atualizado conforme evoluir a automação.**
