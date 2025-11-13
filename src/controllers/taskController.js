// src/controllers/taskController.js
const { Task } = require('../models/taskModel');

async function createTask(req, res, next) {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: 'Tarefa criada com sucesso',
      task,
    });
  } catch (err) {
    next(err);
  }
}

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, createdBy: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json({
      message: 'Tarefa atualizada com sucesso',
      task,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
