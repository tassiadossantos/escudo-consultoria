# CI/CD: Execução automática de migrations Drizzle

## Exemplo de workflow GitHub Actions (.github/workflows/ci.yml)

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 8
      - name: Install dependencies
        run: pnpm install
      - name: Build
        run: pnpm run build
      - name: Run migrations (Drizzle)
        run: pnpm --filter @workspace/db run migrate
      - name: Run tests
        run: pnpm --filter @workspace/api-server test
      # Adicione steps de deploy conforme sua stack (Vercel, AWS, etc)
```

---

# Fluxo de migrations e restauração de banco

## Para novos devs (onboarding)
1. Clone o repositório e copie o arquivo `.env.example` para `.env`.
2. Configure a variável `DATABASE_URL` para um banco de desenvolvimento.
3. Rode as migrations:
   pnpm --filter @workspace/db run migrate
4. Pronto! O banco estará sincronizado com o código.

## Para restaurar banco em caso de incidente
1. Restaure o backup do banco (via Supabase, pg_restore, etc).
2. Atualize a `DATABASE_URL` se necessário.
3. Rode novamente:
   pnpm --filter @workspace/db run migrate
4. Valide se todas as tabelas e dados essenciais estão presentes.

## Recomendações
- Sempre rode migrations antes do deploy.
- Nunca use `push-force` em produção sem backup.
- Documente qualquer alteração manual feita no banco.
