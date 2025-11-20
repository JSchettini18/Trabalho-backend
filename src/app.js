// src/app.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();

// Carrega o arquivo swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'));

// Middlewares globais
app.use(cors());
app.use(express.json());

// Health-check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API de Tarefas funcionando' });
});

// Documentação Swagger (YAML)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas de autenticação e tarefas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// 404
app.use(notFound);

// Handler global de erros
app.use(errorHandler);

module.exports = app;
