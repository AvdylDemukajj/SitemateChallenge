import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createTask, updateTask } from '../api';

const TaskForm = ({ currentTask, setCurrentTask, refreshTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
        }
    }, [currentTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = { title, description };
        if (currentTask) {
            await updateTask(currentTask._id, task);
            setCurrentTask(null); 
        } else {
            await createTask(task);
        }
        refreshTasks();
        setTitle(''); 
        setDescription('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
                label="Task Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Task Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                {currentTask ? 'Update Task' : 'Create Task'}
            </Button>
        </Box>
    );
};

export default TaskForm;
