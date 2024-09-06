const express = require('express');
const { createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

// CRUD routes for tasks
router.get('/tasks', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
