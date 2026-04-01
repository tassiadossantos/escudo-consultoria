

# Frontend — SST Consultoria

Este diretório contém o frontend da Plataforma Digital SST.

## Como rodar

1. Instale as dependências na raiz do monorepo:
   ```sh
   pnpm install
   ```
2. Entre na pasta do frontend:
   ```sh
   cd artifacts/sst-consultoria
   ```

3. Rode o servidor de desenvolvimento:
   ```sh
    pnpm dev
   ```
   - Acesse: http://localhost:5173/

### Ambiente e Build (Local e CI)

Para padronizar execução entre ambientes, este pacote segue as regras abaixo:

- `PORT`:
   - Local: opcional (default `5173`)
   - CI/Deploy: recomendado definir explicitamente
- `BASE_PATH`:
   - Local: opcional (default `/`)
   - CI/Deploy: recomendado definir explicitamente (ex: `/`, `/app/`)

O `vite.config.ts` já possui fallback local, então o build/dev não quebra sem essas variáveis no ambiente de desenvolvimento.

Exemplos:

- Build local (sem env):
   ```sh
   pnpm build
   ```

- Build com env explícito (CI):
   ```sh
   pnpm exec cross-env PORT=5173 BASE_PATH=/ pnpm build
   ```

### Observação sobre experiência visual

Os cards de seleção (urgência e serviços) foram ajustados para garantir acessibilidade e consistência visual:
- O indicador de seleção (círculo verde) aparece corretamente em qualquer opção selecionada.
- O fundo do card muda conforme a opção, mas a borda permanece neutra.
- Toda a área do card é clicável, melhorando a usabilidade.

> Para detalhes completos de arquitetura, visão estratégica, roadmap e instruções avançadas, consulte o [README na raiz do projeto](../../README.md).


---

## Arquitetura Técnica (Resumo)

**Frontend:** React 19 + Vite + Wouter + TanStack Query + Tailwind CSS
**Roteamento:** client-side com `wouter`
**Build/Dev:** Vite com fallback local de `PORT` e `BASE_PATH`
**Integração de API:** proxy local para o backend Express em `/api`
**Estado/UI:** TanStack Query, componentes Radix, hooks locais e toast system

**Decisões Arquiteturais:**
- Home/Serviços/Blog: SPA com rotas client-side
- Formulário: CSR multi-etapa
- Calculadora: CSR puro
- Conteúdo: Markdown local para blog e páginas institucionais
- Integração de backend: chamadas para o serviço Express do monorepo

**Segurança & LGPD:**
- Consentimento granular, registro de opt-in, política de privacidade clara
- Rate limiting, honeypot/hCaptcha, headers de segurança HTTP no backend
- Tabelas extras no backend: consent_records, data_deletion_requests, audit_log, notification_queue

---

## Priorização MVP (4 semanas)

| Feature | Score | Sprint |
|---|---|---|
| Hero Section com CTA duplo | 14 | Semana 2 |
| Formulário orçamento (4 etapas) | 12 | Semana 3 |
| Calculadora de multas | 12 | Semana 3 |
| 4 páginas de serviço SEO | 11 | Semana 2–3 |
| Integração email/WhatsApp | 11 | Semana 3 |
| 3 posts de blog SEO | 9 | Semana 4 |
| Google Meu Negócio + Schema | 13 | Semana 4 |

**Cronograma MVP:**
- Semana 1: Domínio, deploy, DB, identidade visual, wireframes
- Semana 2: Home, serviços, sobre, SEO
- Semana 3: Calculadora, formulário, integrações, consentimento LGPD, analytics
- Semana 4: Blog, Google Meu Negócio, checklist PDF, testes, launch

---

## Métricas e KPIs

| KPI | Benchmark | Meta 6m |
|---|---|---|
| Conversão visitante→lead | 0,5–1% | 5% |
| Bounce rate | 70–80% | <45% |
| Tempo médio no site | <1 min | >3 min |
| % que usam calculadora | N/A | >20% |
| Tempo resposta lead | 24–72h | <30min |
| Lead→cliente | 5–10% | 20% |
| Posição Google | Não ranqueado | Top 3 |

**Eventos custom analytics:** calculated_fine, form_started, form_step_N_completed, form_submitted, checklist_downloaded, whatsapp_clicked, chatbot_opened/conversion

---

## Plano de Ação — Checklist de Launch

1. Registrar domínio (.com.br)
2. Configurar Vercel, Supabase, Resend, Twilio, Plausible
3. Definir identidade visual
4. Implementar layout global, hero, depoimentos, cards de serviço
5. Calculadora de multas, formulário multi-etapa, páginas de serviço
6. API lead, consentimento LGPD, integrações
7. Analytics, blog, Google Meu Negócio, checklist PDF
8. Testes, SEO, schema markup, deploy final, anúncio

---

## Visão de Longo Prazo

- Ano 1: Product-Market Fit, portal básico, monolito React/Vite
- Ano 2–3: Multi-tenancy, marketplace TSTs, pagamentos, app mobile
- Ano 3–5: SaaS white-label, gestão EPI, integração eSocial, assinatura digital
- Ano 5–10: Ecossistema SST, IA para geração de documentos, integração MTE, blockchain

**Moat competitivo:** SEO, base de clientes, dados de comportamento, conteúdo indexado, integração eSocial

---

## Glossário Técnico (trechos)

- **SSG/ISR/SSR/CSR:** Estratégias de renderização web
- **RLS:** Row Level Security (Supabase)
- **ROPA:** Registro de atividades de dados pessoais (LGPD)
- **MRR:** Receita recorrente mensal
- **PGR:** Programa de Gerenciamento de Riscos
- **ADR:** Architecture Decision Record

---

## Filosofia de Execução

- Simplicidade antes de complexidade: lance simples, itere com dados reais
- Dados antes de intuição: use analytics/A-B test
- Receita antes de perfeição: site funcional > site perfeito não lançado
- Fundação antes de escala: LGPD e arquitetura corretas desde o MVP

---

**Este documento é um artefato vivo. Atualize a cada decisão relevante.**
- O frontend está localizado em `artifacts/sst-consultoria`.
- O comando padrão de desenvolvimento é `pnpm dev`.
- O projeto utiliza monorepo com pnpm.
- No Windows, use `pnpm exec cross-env ...` quando precisar forçar variáveis específicas (especialmente em scripts de CI).
