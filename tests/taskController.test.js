// tests/taskController.test.js

// Mock do model no novo formato: { Task, allowedStatus }
jest.mock('../src/models/taskModel', () => {
  return {
    Task: {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findOneAndDelete: jest.fn(),
    },
    allowedStatus: ['pendente', 'em_andamento', 'concluida'],
  };
});

const { Task } = require('../src/models/taskModel');
const { createTask } = require('../src/controllers/taskController');

describe('Task controller', () => {
  it('deve criar tarefa com sucesso', async () => {
    const req = {
      body: { title: 'Tarefa de teste', description: 'Desc teste' },
      user: { id: 'user123' },
    };

    const newTask = {
      _id: 'task123',
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id,
    };

    // Configura o mock para resolver com a nova tarefa
    Task.create.mockResolvedValue(newTask);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    // Executa o controller
    await createTask(req, res, next);

    // Verifica se o model foi chamado corretamente
    expect(Task.create).toHaveBeenCalledWith({
      title: 'Tarefa de teste',
      description: 'Desc teste',
      status: undefined,
      dueDate: undefined,
      createdBy: 'user123',
    });

    // Verifica resposta HTTP
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tarefa criada com sucesso',
      task: newTask,
    });

    // Não deve ter caído no next (erro)
    expect(next).not.toHaveBeenCalled();
  });
});
