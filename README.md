# Escudo Consultoria — Monorepo

Repositório monorepo contendo o frontend (site), um ambiente de prototipagem (preview) e a API.

Resumo
- Frontend (site): `artifacts/sst-consultoria` — aplicação React + Vite (página pública do produto).
- Preview / prototipagem: `artifacts/mockup-sandbox` — ambiente para desenvolver e visualizar componentes isolados.
- Backend: `artifacts/api-server` — API Express.

Requisitos
- Node.js 18+ (20.x recomendado)
- pnpm (v7+)

Instalação
```bash
pnpm install
```

Como rodar (desenvolvimento)
- O comando padrão na raiz abre o **site** (frontend real) e não o preview:
```bash
pnpm run dev        # inicia o site em http://localhost:5174/
```
- Comandos úteis adicionais:
```bash
pnpm run dev:site     # site (artifacts/sst-consultoria) — porta 5174
pnpm run dev:preview  # preview/prototipagem (artifacts/mockup-sandbox) — porta 5173
pnpm run dev:all      # inicia site + preview em paralelo
pnpm run dev:clean    # libera portas padrão (Windows helper)
```

Ambiente
- Copie `.env.example` para `.env` e ajuste as variáveis necessárias.
- Variáveis importantes (sugeridas):
  - Backend: `PORT=3000`
  - Site: `PORT=5174`, `BASE_PATH=/`
  - Preview: `PORT=5173`, `BASE_PATH=/`

Build
- Frontend site (produção):
```bash
cd artifacts/sst-consultoria
pnpm build
# saída: artifacts/sst-consultoria/dist/public
```

Debug rápido
- Se abrir a página errada (ex.: tela "Component Preview Server") — verifique a porta: o preview usa `5173` e o site `5174`.
- Para forçar o site: pare servidores antigos e rode `pnpm run dev` na raiz.

Troubleshooting
- Porta em uso: rode `pnpm run dev:clean` para liberar 5173/5174 (Windows). Ou mate processos manualmente com `netstat` + `taskkill`.
- Erros de dependências nativas no Windows: siga as notas na raiz do projeto para instalar binários nativos.

Boas práticas operacionais
- Reserve portas fixas para cada pacote e documente-as — reduz falhas humanas.
- Use `dev:preview` apenas para prototipagem. O fluxo padrão de desenvolvimento deve apontar ao site real.

Mais documentação
- Consulte os READMEs por pacote em `artifacts/*` para detalhes de build, variáveis e deploy.

---
Profissional, conciso e orientado ao desenvolvimento. Para ajustar o fluxo (ex.: containers, devcontainers ou CI), abra uma issue com os requisitos de ambiente.
