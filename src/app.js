// src/app.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 
const { errorHandler, notFound } = require('./middlewares/errorMiddleware'); 

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Health-check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API de Tarefas funcionando' });
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// 404
app.use(notFound);

// Handler global de erros
app.use(errorHandler);

module.exports = app;
