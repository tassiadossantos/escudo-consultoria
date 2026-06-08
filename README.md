# Escudo Consultoria - API de Missão Crítica

## 🏗 Arquitetura e Visão Sistêmica
Este projeto implementa uma infraestrutura de backend robusta focada em **Integridade de Dados (UUID)**, **Conformidade Regulatória (LGPD)** e **Resiliência de Fluxo**. A arquitetura foi desenhada para escala horizontal e isolamento de falhas.

### Camadas Técnicas
- **Persistence:** PostgreSQL gerenciado via Supabase com abstração de tipo estrito via Drizzle ORM.
- **Validation Layer:** Zod para garantia de integridade de schema em tempo de execução (Runtime Type Safety).
- **Security Perimeter:** Middlewares de CORS, Helmet e JWT (RS256) para proteção de vetores de ataque comuns.
- **Observability:** Telemetria integrada com Pino Logger (JSON structured logs) e rastreabilidade ponta-a-ponta via `traceId`.

## 🛡 Implementações de Missão Crítica
1. **Unificação UUID:** Todos os identificadores sequenciais (Serial) foram migrados para UUID v4 para evitar vazamento de metadados e permitir shard de banco.
2. **Soft Delete & Auditoria:** Implementação de Direito ao Esquecimento (LGPD) onde registros pessoais são marcados com `deleted_at` sem perda de integridade referencial.
3. **Resiliência de Webhooks:** Disparos de auditoria externa e notificações operam em blocos isolados com captura de exceção, garantindo que falhas de rede de terceiros não interrompam o fluxo principal de negócios.
4. **Global Error Handling:** Unificação de respostas 4xx e 5xx para garantir consistência de consumo pelo frontend.

## 🛠 Comandos Operacionais (Terminal)

### 1. Inicialização de Infraestrutura (Cold Start)
Caso haja inconsistência entre o estado físico (DB) e o estado lógico (Drizzle), execute o protocolo de reset:
```powershell
# Para os containers e deleta volumes persistentes
npx supabase stop --no-backup

# Inicia nova instância limpa
npx supabase start
```

### 2. Sincronização de Schema
Aplica as definições de UUID e chaves estrangeiras ao PostgreSQL:
```powershell
npm run db:push
```

### 3. Suíte de Testes e Validação de Cobertura
Protocolo de verificação exaustiva com isolamento de threads para garantir atomicidade:
```powershell
npm run test:coverage
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