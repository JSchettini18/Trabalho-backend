// src/server.js
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db'); 

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco de dados', err);
    process.exit(1);
  });
