// src/models/taskModel.js
const mongoose = require('mongoose');

const allowedStatus = ['pendente', 'em_andamento', 'concluida'];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: allowedStatus,
        message: 'Status inválido. Use pendente, em_andamento ou concluida',
      },
      default: 'pendente',
    },
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
module.exports.allowedStatus = allowedStatus;
