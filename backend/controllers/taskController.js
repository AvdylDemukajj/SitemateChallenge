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

let issueCount = 0;
exports.getTask = async (req, res) => {
    try {
        issueCount++;
        const tasks = await Task.find();
        if (tasks.length > 0) {
            const randomTask = tasks[issueCount % tasks.length];
            res.json(randomTask);
        } else {
            res.json({ message: "No tasks found" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, completed } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { name, completed }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};