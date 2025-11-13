// tests/taskRoutes.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Task routes - autenticação', () => {
  it('deve retornar 401 ao tentar criar tarefa sem token', async () => {
    const res = await request(app).post('/api/v1/tasks').send({
      title: 'Teste sem token',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty(
      'message',
      'Token de autenticação não fornecido'
    );
  });
});
