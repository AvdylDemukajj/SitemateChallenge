const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { name, completed } = req.body;
        const newTask = new Task({ name, completed });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};