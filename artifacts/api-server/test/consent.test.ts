
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('POST /consent', () => {
  it('deve registrar consentimento válido', async () => {
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
  });

  it('deve rejeitar consentimento inválido', async () => {
    const res = await request(app)
      .post('/api/consent')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
