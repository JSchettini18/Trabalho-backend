// src/validators/authValidators.js
const { body } = require('express-validator');

const registerValidation = [
  body('name')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2 })
    .withMessage('Nome deve ter no mínimo 2 caracteres'),
  body('email')
    .notEmpty()
    .withMessage('E-mail é obrigatório')
    .isEmail()
    .withMessage('E-mail inválido'),
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
];

const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('E-mail é obrigatório')
    .isEmail()
    .withMessage('E-mail inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
];

module.exports = {
  registerValidation,
  loginValidation,
};
