// src/routes/taskRoutes.js
const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const {
  createTaskValidation,
  updateTaskValidation,
} = require('../validators/taskValidators');
const validateRequest = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas as rotas de tarefas exigem autenticação
router.use(authMiddleware);

// GET /api/v1/tasks
router.get('/', getTasks);

// GET /api/v1/tasks/:id
router.get('/:id', getTaskById);

// POST /api/v1/tasks
router.post('/', createTaskValidation, validateRequest, createTask);

// PUT /api/v1/tasks/:id
router.put('/:id', updateTaskValidation, validateRequest, updateTask);

// DELETE /api/v1/tasks/:id
router.delete('/:id', deleteTask);

module.exports = router;
