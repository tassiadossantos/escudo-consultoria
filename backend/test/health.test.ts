import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
  it('deve retornar 200 e status ok', async () => {
    const res = await request(app)
      .get('/health')
      .set('Accept', 'application/json');
      
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      service: 'escudo-api',
      timestamp: expect.any(String),
      uptime: expect.any(Number)
    });
  });
});