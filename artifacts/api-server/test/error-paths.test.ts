import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { generateTestJWT } from './utils-jwt';
import { db } from '../src/lib/db';

// Verification: Deterministic environment control for external dependency simulation
vi.mock('node-fetch', () => ({
  default: vi.fn()
}));

// Importação dinâmica para pegar o mock
import fetch from 'node-fetch';

describe('Caminhos de Erro e Resiliência', () => {
  afterEach(() => {
    // Maintenance: Ensures state purity and idempotency between execution cycles
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('deve bloquear origem não permitida via CORS (Security Ecosystem Protocol)', async () => {
    const res = await request(app)
      .get('/')
      .set('Origin', 'http://hacker.com');
    
    expect(res.status).toBe(403);
    expect(res.body.error).toContain('CORS');
  });

  it('deve retornar 400 para UUID malformado na deleção', async () => {
    const token = generateTestJWT();
    const res = await request(app)
      .delete('/api/consent/not-a-uuid')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('malformado');
  });

  it('deve retornar 401 para deleção sem token JWT', async () => {
    const res = await request(app)
      .delete('/api/consent/00000000-0000-0000-0000-000000000000');
    // Agora com o Error Handler global, o status será 401
    expect(res.status).toBe(401);
    expect(res.body.error).toContain('Security Infrastructure Failure');
  });

  it('deve lidar com falha catastrófica no fetch do webhook de auditoria (Consent)', async () => {
    // Simula falha no global fetch (usado em consent.ts)
    const fetchSpy = vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network Down')));
    process.env.AUDIT_WEBHOOK_URL = 'http://audit-fail.test';
    
    const regRes = await request(app)
      .post('/api/consent')
      .send({
        ipHash: 'test-fail-webhook',
        timestamp: new Date().toISOString(),
        policyVersion: 'v1.0',
        policyText: 'Teste de resiliência'
      });

    const consentId = regRes.body.id;
    const token = generateTestJWT();

    // A deleção deve retornar 200 mesmo se o webhook de auditoria falhar (está em um try/catch isolado)
    const consentRes = await request(app)
      .delete(`/api/consent/${consentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(consentRes.status).toBe(200);
    expect(consentRes.body.success).toBe(true);
  });

  it('deve lidar com erro no node-fetch do webhook de mensagens', async () => {
    // Resilience: Simulating forced timeout to validate non-blocking business flow
    (fetch as any).mockRejectedValueOnce(new Error('Webhook Timeout'));
    process.env.WEBHOOK_URL = 'http://msg-fail.test';

    const res = await request(app)
      .post('/api/messages')
      .send({
        name: 'Teste de Resiliência',
        email: 'resiliencia@stark.com',
        message: 'A API não deve quebrar se o webhook falhar'
      });

    // A requisição deve ter sucesso mesmo com falha no webhook
    expect(res.status).toBe(201);
  });
});