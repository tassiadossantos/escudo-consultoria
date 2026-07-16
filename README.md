# Escudo Consultoria - Site e API de Missão Crítica

Plataforma completa para a Escudo Consultoria:
- **Site Moderno**: Frontend em React + Vite + Tailwind para consultoria em Segurança do Trabalho (SST), com calculadora de multas, blog, checklist gratuito e mais
- **API Robusta**: Backend em Express + TypeScript + Drizzle ORM com foco em integridade de dados, LGPD e resiliência

## 🏗 Arquitetura e Visão Sistêmica
Este projeto combina um frontend de alta conversão com uma infraestrutura de backend robusta focada em **Integridade de Dados (UUID)**, **Conformidade Regulatória (LGPD)** e **Resiliência de Fluxo**. A arquitetura foi desenhada para escala horizontal e isolamento de falhas.

### Camadas Técnicas
- **Persistence:** PostgreSQL gerenciado via Supabase com abstração de tipo estrito via Drizzle ORM.
- **Validation Layer:** Zod para garantia de integridade de schema em tempo de execução (Runtime Type Safety).
- **Security Perimeter:** Middlewares de CORS, Helmet e JWT (RS256) para proteção de vetores de ataque comuns.
- **Observability:** Telemetria integrada com Pino Logger (JSON structured logs) e rastreabilidade ponta-a-ponta via `traceId`.

### Ecossistema de Aplicações
Esta API de missão crítica serve como o backbone para o **Super Site de Consultoria SST**, uma plataforma frontend projetada para qualificação de leads, educação de mercado e conversão 24/7. A API gerencia a persistência de dados (leads, clientes, documentos, treinamentos, posts de blog), autenticação, e integrações críticas, garantindo a integridade e resiliência necessárias para o ecossistema completo da Escudo Consultoria.


## 🛡 Implementações de Missão Crítica
1.  **Unificação UUID:** Identificadores UUID v4 para evitar vazamento de metadados e permitir sharding.
2.  **Soft Delete & LGPD:** Implementação de "Direito ao Esquecimento" via `deleted_at` com preservação de integridade.
3.  **Resiliência de Webhooks:** Blocos `try/catch` isolados garantem que falhas em serviços de terceiros (Auditoria/Notificação) não interrompam a transação principal.
4.  **Runtime Type Safety:** Validação rigorosa via Zod em todas as entradas de API.

## 🛠 Protocolos Operacionais (Terminal)

**Nota:** Este projeto utiliza `pnpm` e o protocolo `catalog:`. O uso de `npm` resultará em erros de instalação.

### 1. Preparação do Ambiente
```powershell
# Instalação de dependências do workspace
pnpm install
```

### 2. Desenvolvimento e Execução
```powershell
# Iniciar site principal (Porta 5174)
pnpm run dev

# Iniciar backend (API) local (Porta 3000)
pnpm run dev:api

# Iniciar site e Mockup Sandbox simultaneamente
pnpm run dev:all
```

### 3. O que é necessário para rodar o backend local?
1. **Banco de dados PostgreSQL**: Instância do PostgreSQL rodando localmente (ou via Docker) ou use um projeto do Supabase (recomendado).
2. **Arquivo .env**: Configure o arquivo `.env` na raiz do projeto (use `.env.example` como modelo).
3. **Migrações do banco**: Aplique o schema usando `pnpm --filter @workspace/db run migrate`.
4. **Dependências**: Instale as dependências com `pnpm install` (já feito).

### 4. Gerenciamento de Banco de Dados
```powershell
# Iniciar infraestrutura Supabase local
npx supabase start

# Sincronizar Schema (Drizzle -> Postgres)
pnpm run db:push

# Interface Visual do Banco de Dados
pnpm run db:studio
```

### 5. Sincronização de Schema
Aplica as definições de UUID e chaves estrangeiras ao PostgreSQL:
```powershell
pnpm run db:push
```

### 6. Suíte de Testes e Validação de Cobertura
Protocolo de verificação exaustiva com isolamento de threads para garantir atomicidade:
```powershell
# Executar todos os testes
pnpm run test

# Executar testes com cobertura
pnpm run test:coverage
```

## 🧪 Resultados de Verificação e Validação (V&V)
A suíte de testes atual cobre os seguintes vetores críticos:
- **LGPD Integrity:** Validação física no banco de dados após deleção via API.
- **CORS Security:** Bloqueio de origens não autorizadas com retorno `403`.
- **Auth Resiliency:** Validação de tokens JWT e tratamento de erros `401`.
- **Chaos Simulation:** Mocking de falha catastrófica de rede para webhooks de auditoria.

## 🚀 Como Deployar o Site no GitHub Pages (Passo a Passo para Iniciantes)

Este guia explica exatamente como fazer o site da Escudo Consultoria ficar disponível publicamente no GitHub Pages, mesmo que você não tenha experiência com isso!

### Pré-requisitos
- Você já deve ter o repositório no GitHub (se não, veja a seção anterior sobre como criar o repo e fazer o primeiro push)
- Você deve ter o repositório configurado como **Público** (se for privado, o GitHub Pages só funciona com GitHub Pro, mas o público é gratuito!)

---

### Passo 1: Verificar que o Workflow já está no Repositório
Já temos um arquivo pronto para fazer o deploy automaticamente! Ele está em:
`.github/workflows/deploy-github-pages.yml`

Esse arquivo diz ao GitHub: "Toda vez que alguém enviar código para a branch `main`, construa o site e publique no GitHub Pages!"

---

### Passo 2: Configurar o GitHub Pages no Seu Repositório
Isso é o mais importante! Se você pular esse passo, o GitHub vai continuar mostrando o README.md em vez do site!

1. Vá para a página do seu repositório no GitHub (ex: `https://github.com/tassiadossantos/escudo-consultoria`)
2. Clique em **Settings** (Configurações) no menu superior direito (é o ícone de engrenagem)
3. No menu lateral esquerdo, role para baixo até encontrar **Pages** (abaixo de "Code and automation") e clique nele
4. Na seção **Build and deployment** (Construção e implantação):
   - Em **Source** (Fonte): Escolha **GitHub Actions** (não escolha "Deploy from a branch"!)
   - Deixe a opção **Branch** (Ramificação) como está (não precisa mudar)
5. Não precisa clicar em "Save" — o GitHub salva automaticamente!

---

### Passo 3: Aguardar o Workflow Rodar
Depois de configurar a fonte como GitHub Actions:
1. Volte para a página principal do seu repositório
2. Clique na aba **Actions** (Ações) no menu superior
3. Você verá um workflow chamado **Deploy to GitHub Pages** rodando (tem um círculo amarelo girando)
4. Aguarde até que o workflow termine (o círculo fica verde com um ✅) — isso pode levar de 2 a 5 minutos!

---

### Passo 4: Acessar o Site!
Quando o workflow terminar:
1. Volte para **Settings** → **Pages**
2. No topo da página, você verá uma mensagem: "Your site is live at `https://SEU-USUARIO.github.io/escudo-consultoria/`"
3. Clique nesse link — o site da Escudo Consultoria está no ar! 🎉

---

### Problemas Comuns e Como Corrigir
1. **O site ainda mostra o README.md, não o site?**
   - Volte para **Settings** → **Pages** e certifique-se que a **Source** (Fonte) está definida como **GitHub Actions**, não como "Deploy from a branch"!
2. **As imagens não estão carregando?**
   - Nós já adicionamos um arquivo `.nojekyll` no workflow para evitar esse problema — se ainda estiver acontecendo, aguarde mais 5 minutos e atualize a página
3. **O workflow está falhando (tem um ❌)?**
   - Clique no workflow que falhou na aba **Actions**, veja o log de erros e me avise para ajudar a corrigir!

---

**Status de Engenharia:** `STABLE` | **Coverage:** `>90% (Core API)`
**Documentação de API:** Disponível via Orval/OpenAPI no diretório `lib/api-spec`.