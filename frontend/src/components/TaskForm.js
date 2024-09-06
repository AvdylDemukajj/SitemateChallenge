import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

const TaskForm = ({ currentTask, setCurrentTask, refreshTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
        }
    }, [currentTask]);

    const createTask = async (task) => {
        try {
            await axios.post(`${API_URL}/tasks`, task);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentTask) {
            await updateTask(currentTask._id, { title, description });
            setCurrentTask(null);
        } else {
            await createTask({ title, description });
        }
        refreshTasks();
        setTitle('');
        setDescription('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, backgroundColor: 'white  ', p: 2, borderRadius: 2 }}>
            <TextField
                label="Task Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
                {currentTask ? 'Update Task' : 'Create Task'}
            </Button>
        </Box>
    );
};

export default TaskForm;
