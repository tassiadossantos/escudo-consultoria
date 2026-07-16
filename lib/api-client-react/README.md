# Frontend API Client (lib/api-client-react)

## Visão Geral

Este pacote fornece hooks e utilitários para consumir a API do backend, incluindo rastreabilidade de consentimento, status de notificações e integração com a arquitetura orientada a eventos.

## Funcionalidades
- Hooks para endpoints de lead, consentimento, mensagens, etc.
- Consulta de status de notificações (pending, sent, failed) para feedback ao usuário.
- Integração com automação de eventos: exibe status de envio (WhatsApp, e-mail, webhook) em tempo real.
- Pronto para rastreabilidade LGPD: exibe logs e status de exclusão.

## Exemplo de Uso

```tsx
import { useCreateLead, useNotificationStatus } from 'api-client-react';

const MyComponent = () => {
  const createLead = useCreateLead();
  const { status } = useNotificationStatus(leadId);

  // ...
};
```

## Observações
- Certifique-se de que o backend e o worker estejam rodando para automação completa.
- Consulte o README do backend para detalhes de eventos e rastreabilidade.

---

**Mantenha este README atualizado conforme evoluir a integração.**
