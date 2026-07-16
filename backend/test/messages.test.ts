import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('POST /messages', () => {
  it('deve registrar lead/mensagem válido', async () => {
    // Primeiro registra consentimento
    const consentRes = await request(app)
      .post('/api/consent')
      .send({
        timestamp: new Date().toISOString(),
        policyVersion: 'v1.0',
        policyText: 'Li e aceito a política de privacidade.'
      });
    expect(consentRes.status).toBe(201);
    expect(consentRes.body).toHaveProperty('id');
    const consentId = consentRes.body.id;

    // Agora registra mensagem associada
    const res = await request(app)
      .post('/api/messages')
      .send({
        name: 'Teste Lead',
        email: 'lead@teste.com',
        phone: '11999999999',
        message: 'Mensagem de teste',
        consentId
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve rejeitar mensagem inválida', async () => {
    const res = await request(app)
      .post('/api/messages')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
