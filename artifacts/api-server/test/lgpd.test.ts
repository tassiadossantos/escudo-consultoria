import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { generateTestJWT } from './utils-jwt';
import { db } from '../src/lib/db';
import { messages, consentRecords } from '../../../lib/db/src/schema/index';
import { eq } from 'drizzle-orm';

describe('LGPD — Direito ao Esquecimento', () => {
  let consentId: string | undefined;
  let messageId: string | undefined;

  it('deve registrar consentimento com IP mascarado', async () => {
    const res = await request(app)
      .post('/api/consent')
      .send({
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
    expect(messageId).toBeDefined();
    const token = generateTestJWT();
    const res = await request(app)
      .delete(`/api/messages/${messageId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);

    // Auditoria de Banco: Validar se o registro foi marcado como deletado fisicamente
    const [dbRecord] = await db.select().from(messages).where(eq(messages.id, messageId!));
    expect(dbRecord.deletedAt).not.toBeNull();
  });

  it('deve deletar consentimento (direito ao esquecimento)', async () => {
    expect(consentId).toBeDefined();
    const token = generateTestJWT();
    const res = await request(app)
      .delete(`/api/consent/${consentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);

    // Auditoria de Banco: Validar se o consentimento foi marcado como deletado fisicamente
    const [dbRecord] = await db.select().from(consentRecords).where(eq(consentRecords.id, consentId!));
    expect(dbRecord.deletedAt).not.toBeNull();
  });
});
