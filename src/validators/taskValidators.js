// src/validators/taskValidators.js
const { body } = require('express-validator');
const { allowedStatus } = require('../models/taskModel');

const createTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage('Título é obrigatório')
    .isLength({ min: 3 })
    .withMessage('Título deve ter no mínimo 3 caracteres'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Descrição deve ter no máximo 500 caracteres'),
  body('status')
    .optional()
    .isIn(allowedStatus)
    .withMessage(
      `Status inválido. Use um destes: ${allowedStatus.join(', ')}`
    ),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Data de conclusão deve estar em formato ISO válido'),
];

const updateTaskValidation = [
  body('title')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Título deve ter no mínimo 3 caracteres'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Descrição deve ter no máximo 500 caracteres'),
  body('status')
    .optional()
    .isIn(allowedStatus)
    .withMessage(
      `Status inválido. Use um destes: ${allowedStatus.join(', ')}`
    ),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Data de conclusão deve estar em formato ISO válido'),
];

module.exports = {
  createTaskValidation,
  updateTaskValidation,
};
