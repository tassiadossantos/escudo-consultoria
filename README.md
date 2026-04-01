

# Super Site de Consultoria SST

Arquitetura Web para Dominação do Mercado de Segurança do Trabalho

---

> **Este é o blueprint técnico e estratégico para construir a máquina de vendas digital definitiva para consultorias de SST.**

## CONTEXTO E VISÃO ESTRATÉGICA
Você é uma arquiteta de software sênior e designer de produto com a união das mentes de Grace Hopper, Alan Turing, Dennis Ritchie, Margaret Hamilton, Bill Gates, Steve Jobs/Wozniak, Satoshi Nakamoto e Tony Stark.

### Missão
Projetar e implementar um site revolucionário de consultoria em SST que não seja apenas "mais um site institucional", mas sim uma máquina de conversão, uma plataforma de autoridade e o primeiro ponto de contato de um ecossistema digital que vai dominar o mercado brasileiro de Segurança do Trabalho.

### O que será construído
- 12 páginas individuais de serviço (PGR, APR, NR 35, NR 33, etc.) com conteúdo SEO-otimizado, breadcrumbs e schema markup.
- Calculadora de multas interativa, blog SEO, chatbot, portal do cliente, automações de WhatsApp/email, área de downloads, analytics cirúrgico.

---

## PROBLEMA A RESOLVER
O mercado de SST é dominado por sites genéricos, sem proposta de valor, com baixíssima conversão e zero rastreabilidade de leads. O objetivo é transformar o site em uma máquina de vendas e autoridade.

---

## VISÃO DE PRODUTO: O QUE CONSTRUIR
O site será um sistema inteligente que qualifica leads, educa o mercado, demonstra autoridade, converte 24/7, nutre relacionamento e mede tudo.

Proposta de Valor Central: **"O site que vende enquanto você dorme. Cada visitante é um lead potencial que nunca será perdido."**

---

## ARQUITETURA DO SITE
### 1. Camada de Aquisição (Topo do Funil)
- Landing Page Principal (Home) com hero focado na dor (multa), CTA duplo, trust badges, depoimentos reais, cards de serviço, calculadora interativa.
- 12 páginas de serviço individuais, cada uma SEO-otimizada, com breadcrumbs, schema markup, CTAs claros e conteúdo profundo.

### 2. Camada de Autoridade (Meio do Funil)
- Blog SEO-optimizado, calendário editorial, artigos long-tail, ferramentas gratuitas (checklist, calculadora de investimento, quiz NR).

### 3. Camada de Conversão (Fundo do Funil)
- Formulário de orçamento multi-etapa, chatbot inteligente, automações de WhatsApp/email, área do cliente (portal), analytics detalhado.

---

## ARQUITETURA TÉCNICA
- **Frontend:** Next.js 15 (App Router), shadcn/ui, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, Supabase (Postgres, Auth, Storage), Resend (email), Twilio (WhatsApp), Plausible (analytics)
- **Infra:** Vercel, Cloudflare, Registro.br, Sentry

### Paleta de Cores
- Verde base: #2E7D32 (botões, destaques)
- Verde escuro: #1B5E20 (header, footer)
- Verde médio: #256628 (hover)
- Verde claro: #A5D6A7 (fundos informativos)
- Verde muito claro: #E8F5E9 (background)
- Cinza grafite: #263238 (texto principal)
- Cinza claro: #CFD8DC (divisores)
- Branco: #FFFFFF (respiro)
- Laranja: #F9A825 (CTA principal)
- Vermelho: #C62828 (alertas críticos)

---

## COMO RODAR O PROJETO

### Instalação geral (monorepo)
```sh
pnpm install
```

### Rodar o backend
```sh
cd artifacts/api-server
pnpm exec cross-env PORT=3000 pnpm dev
# Acesse: http://localhost:3000/
```

### Rodar o frontend
```sh
cd artifacts/sst-consultoria
pnpm dev
# Acesse: http://localhost:5173/
```

Para padronizar o comportamento local e de CI do frontend, consulte a seção **Ambiente e Build (Local e CI)** em [artifacts/sst-consultoria/README.md](artifacts/sst-consultoria/README.md). Em resumo:

- Local: `PORT` e `BASE_PATH` são opcionais, com defaults `5173` e `/`
- CI/Deploy: defina `PORT` e `BASE_PATH` explicitamente para evitar divergências de ambiente

#### Possíveis erros e soluções
- Se ocorrer erro de dependências nativas (ex: @rollup/rollup-win32-x64-msvc, lightningcss-win32-x64-msvc, @tailwindcss/oxide-win32-x64-msvc):
  1. Instale os pacotes nativos na raiz:
     ```sh
     pnpm add -w @rollup/rollup-win32-x64-msvc lightningcss-win32-x64-msvc @tailwindcss/oxide-win32-x64-msvc --save-dev
     ```
  2. Apague a pasta `node_modules` e o arquivo `pnpm-lock.yaml` na raiz.
  3. Rode `pnpm install` novamente na raiz.
  4. Tente rodar o frontend novamente.

---

## ESTRUTURA DE PASTAS (MONOREPO)
- `artifacts/api-server` — Backend (Node.js/Express)
- `artifacts/sst-consultoria` — Frontend (React/Vite)
- `lib/` — Bibliotecas compartilhadas
- `scripts/` — Scripts utilitários

---

## ROADMAP DE IMPLEMENTAÇÃO
### Fase 1: MVP (Semana 1-4)
- Semana 1: Setup, identidade visual, wireframes
- Semana 2: Home, 4 páginas de serviço, sobre, SEO
- Semana 3: Calculadora, formulário, integrações, LGPD, analytics
- Semana 4: Blog, Google Meu Negócio, checklist PDF, testes, launch

### Fase 2: Growth (Mês 2-6)
- Completar 12 páginas de serviço, blog, chatbot, portal do cliente, automações

### Fase 3: Scale (Mês 7-12)
- App mobile, agendamento online, pagamentos, CRM, ads, vídeo marketing

---

## KPIs E MÉTRICAS DE SUCESSO
- Conversão visitante→lead: 3–5%
- Bounce rate: <50%
- Tempo médio no site: >2min
- Calculadora usada: 15% dos visitantes
- Posição Google: Top 3

---


## SEGURANÇA, LGPD, AUTOMAÇÃO E CONFORMIDADE
- Consentimento granular, registro de opt-in, política de privacidade clara
- Fila de eventos (notification_queue) para WhatsApp/email/webhook, com retry e rastreabilidade
- Worker automatizado para processar eventos e enviar notificações (scripts/notification-worker.js)
- Soft delete, auditoria detalhada, logs e webhook externo para exclusão LGPD
- Processo sistematizado de reviews no Google Meu Negócio
- Analytics sem cookies (Plausible)

---

## DOCUMENTAÇÃO POR PACOTE
- Frontend SST: [artifacts/sst-consultoria/README.md](artifacts/sst-consultoria/README.md)
- Backend API: [artifacts/api-server/README.md](artifacts/api-server/README.md)

---

## FILOSOFIA DE EXECUÇÃO
- Design > Código. Se não é intuitivo, não presta.
- Ship fast, iterate faster. Perfeito é inimigo do bom.
- Testes, testes, testes. Formulário quebrado = lead perdido.
- Stop overthinking, just build it.

---

---

## AUTOMAÇÃO DE NOTIFICAÇÕES E EVENTOS

- Toda ação crítica (lead, consentimento, exclusão, erro) gera evento na fila notification_queue
- O worker lê a fila e envia notificações (WhatsApp, e-mail, webhook, etc.)
- Integração pronta para Twilio/WhatsApp (ver instruções no backend)
- Status e rastreabilidade total de cada evento (pending, sent, failed)

**Este documento é um artefato vivo. Atualize a cada decisão relevante.**
