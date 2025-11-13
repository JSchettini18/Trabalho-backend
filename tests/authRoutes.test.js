// tests/authRoutes.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Auth routes - validações', () => {
  it('deve retornar 400 ao tentar registrar sem dados', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Erro de validação');
  });

  it('deve retornar 400 ao tentar logar sem dados', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Erro de validação');
  });
});
