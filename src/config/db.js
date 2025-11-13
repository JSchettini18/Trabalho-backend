// src/config/db.js
const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('Variável de ambiente MONGO_URI não definida');
  }

  try {
    await mongoose.connect(uri);
    console.log('Conectado ao MongoDB com sucesso');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    throw err;
  }
}

module.exports = connectDB;
