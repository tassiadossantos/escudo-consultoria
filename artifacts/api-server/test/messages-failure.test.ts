import { vi, describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { db } from '../src/lib/db';
import { generateTestJWT } from './utils-jwt';

vi.mock('../src/lib/db', () => ({
  db: {
    transaction: vi.fn(),
  },
}));

describe('POST /messages - Falhas de Banco de Dados', () => {
  it('deve retornar 500 quando o banco falha na inserção da mensagem', async () => {
    // Força a transação a falhar
    vi.mocked(db.transaction).mockRejectedValue(new Error('Critical Database Failure'));

    const res = await request(app)
      .post('/api/messages')
      .send({
        name: 'Teste Falha',
        email: 'falha@escudo.com',
        phone: '11999999999',
        message: 'Simulando erro de persistência',
        consentId: '00000000-0000-0000-0000-000000000000'
      });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Erro ao registrar mensagem');
  });

  it('deve retornar 500 quando o banco falha na deleção de mensagem', async () => {
    vi.mocked(db.transaction).mockRejectedValue(new Error('Delete Transaction Error'));
    const token = generateTestJWT();
    const res = await request(app)
      .delete('/api/messages/00000000-0000-0000-0000-000000000000')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Erro ao deletar mensagem');
  });
});