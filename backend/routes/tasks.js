const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Criar tarefa
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      user: req.user.id,
    });
    const task = await newTask.save();
    res.json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Obter todas as tarefas
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Atualizar tarefa (editar)
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Verifica se a tarefa pertence ao usuário logado
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    task.title = req.body.title || task.title;
    await task.save();
    res.json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Alternar status de conclusão da tarefa
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Verifica se a tarefa pertence ao usuário logado
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    task.completed = req.body.completed;
    await task.save();
    res.json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Deletar tarefa
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Verifica se a tarefa pertence ao usuário logado
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await task.remove();
    res.json({ msg: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
