import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createTask, updateTask } from '../api';

const TaskForm = ({ currentTask, setCurrentTask, refreshTasks }) => {
    const [name, setName] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (currentTask) {
            setName(currentTask.name);
            setCompleted(currentTask.completed);
        }
    }, [currentTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentTask) {
            await updateTask(currentTask._id, { name, completed });
            setCurrentTask(null); 
        } else {
            await createTask({ name, completed });
        }
        refreshTasks();
        setName(''); 
        setCompleted(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
                label="Task Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                {currentTask ? 'Update Task' : 'Create Task'}
            </Button>
        </Box>
    );
};

export default TaskForm;