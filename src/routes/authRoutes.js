// src/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const {
  registerValidation,
  loginValidation,
} = require('../validators/authValidators');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

// POST /api/v1/auth/register
router.post('/register', registerValidation, validateRequest, register);

// POST /api/v1/auth/login
router.post('/login', loginValidation, validateRequest, login);

module.exports = router;
