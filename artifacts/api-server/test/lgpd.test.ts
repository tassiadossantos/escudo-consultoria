import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { generateTestJWT } from './utils-jwt';

describe('LGPD — Direito ao Esquecimento', () => {
  let consentId: number | undefined;
  let messageId: number | undefined;

  it('deve registrar consentimento com IP mascarado', async () => {
    const res = await request(app)
      .post('/api/consent')
      .send({
        ipHash: 'hash_teste',
        timestamp: new Date().toISOString(),
        policyVersion: 'v1.0',
        policyText: 'Li e aceito a política de privacidade.'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    consentId = res.body.id;
  });

  it('deve registrar mensagem associada', async () => {
    const res = await request(app)
      .post('/api/messages')
      .send({
        name: 'Teste LGPD',
        email: 'lgpd@teste.com',
        phone: '11999999999',
        message: 'Mensagem LGPD',
        consentId
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    messageId = res.body.id;
  });


  it('deve deletar mensagem (direito ao esquecimento)', async () => {
    const token = generateTestJWT();
    const res = await request(app)
      .delete(`/api/messages/${messageId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('deve deletar consentimento (direito ao esquecimento)', async () => {
    const token = generateTestJWT();
    const res = await request(app)
      .delete(`/api/consent/${consentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });
});
