# Escudo Consultoria - API de Missão Crítica

## 🏗 Arquitetura e Visão Sistêmica
Este projeto implementa uma infraestrutura de backend robusta focada em **Integridade de Dados (UUID)**, **Conformidade Regulatória (LGPD)** e **Resiliência de Fluxo**. A arquitetura foi desenhada para escala horizontal e isolamento de falhas.

### Camadas Técnicas
- **Persistence:** PostgreSQL gerenciado via Supabase com abstração de tipo estrito via Drizzle ORM.
- **Validation Layer:** Zod para garantia de integridade de schema em tempo de execução (Runtime Type Safety).
- **Security Perimeter:** Middlewares de CORS, Helmet e JWT (RS256) para proteção de vetores de ataque comuns.
- **Observability:** Telemetria integrada com Pino Logger (JSON structured logs) e rastreabilidade ponta-a-ponta via `traceId`.

### Ecossistema de Aplicações
Esta API de missão crítica serve como o backbone para o **Site de Consultoria SST**, uma plataforma frontend projetada para qualificação de leads, educação de mercado e conversão 24/7. A API gerencia a persistência de dados (leads, clientes, documentos, treinamentos, posts de blog), autenticação, e integrações críticas, garantindo a integridade e resiliência necessárias para o ecossistema completo da Escudo Consultoria.


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

# Iniciar site e Mockup Sandbox simultaneamente
pnpm run dev:all
```

### 3. Gerenciamento de Banco de Dados
```powershell
# Iniciar infraestrutura Supabase local
npx supabase start

# Sincronizar Schema (Drizzle -> Postgres)
pnpm run db:push

# Interface Visual do Banco de Dados
pnpm run db:studio
```

### 2. Sincronização de Schema
Aplica as definições de UUID e chaves estrangeiras ao PostgreSQL:
```powershell
pnpm run db:push
```

### 3. Suíte de Testes e Validação de Cobertura
Protocolo de verificação exaustiva com isolamento de threads para garantir atomicidade:
```powershell
pnpm run test:coverage
```

## 🧪 Resultados de Verificação e Validação (V&V)
A suíte de testes atual cobre os seguintes vetores críticos:
- **LGPD Integrity:** Validação física no banco de dados após deleção via API.
- **CORS Security:** Bloqueio de origens não autorizadas com retorno `403`.
- **Auth Resiliency:** Validação de tokens JWT e tratamento de erros `401`.
- **Chaos Simulation:** Mocking de falha catastrófica de rede para webhooks de auditoria.

---
**Status de Engenharia:** `STABLE` | **Coverage:** `>90% (Core API)`
**Documentação de API:** Disponível via Orval/OpenAPI no diretório `lib/api-spec`.
