# Profiling e Stress Test (API e Frontend)

## Ferramentas sugeridas
- Frontend: React DevTools, Chrome DevTools, Lighthouse
- API: autocannon, k6, Artillery

## Passos
1. Instalar dependências:
   - npm install --save-dev autocannon k6
2. Mapear rotas/endpoints críticos (ex: /api/leads, /api/consent, páginas principais).
3. Criar scripts de stress test para API (exemplo em scripts/stress-test.js).
4. Executar Lighthouse e DevTools para frontend.
5. Documentar resultados e gargalos encontrados.
6. Otimizar queries, componentes e assets conforme achados.

---
# Pipeline CI/CD Automatizado

## Ferramentas sugeridas
- GitHub Actions (ou Vercel/GitLab CI)
- ESLint, Prettier, TypeScript, Jest/Testing Library

## Passos
1. Criar arquivo .github/workflows/ci.yml com etapas:
   - Lint (ESLint, Prettier)
   - Typecheck (TypeScript)
   - Testes unitários/integrados
   - Build e deploy automático
   - Execução de migrations (Drizzle)
2. Validar rollback e notificações de falha.
3. Automatizar execução dos testes E2E (Playwright/Cypress).

---
# Referências rápidas
- https://github.com/GoogleChrome/lighthouse
- https://github.com/mcollina/autocannon
- https://k6.io/docs/
- https://docs.github.com/en/actions
