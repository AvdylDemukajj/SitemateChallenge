import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const TaskList = ({ tasks, setTasks, setCurrentTask }) => {
    const completeTask = (id) => {
        const updatedTasks = tasks.map(task => 
            task._id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks); 
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
            const updatedTasks = tasks.filter(task => task._id !== id);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <List>
            {tasks.map((task) => (
                <ListItem 
                    key={task._id} 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        backgroundColor: task.completed ? '#e0f7fa' : '#f9f9f9', 
                        mb: 1, 
                        borderRadius: 1, 
                        p: 2, 
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
                    }}
                >
                    <ListItemText 
                        primary={task.title} 
                        secondary={`Description: ${task.description}`} 
                        primaryTypographyProps={{ color: 'text.primary', fontWeight: 'bold', textDecoration: task.completed ? 'line-through' : 'none' }}
                        secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <Box>
                        <IconButton 
                            onClick={() => completeTask(task._id)} 
                        >
                            {task.completed ? (
                                <CheckCircleIcon sx={{ color: 'green' }} /> 
                            ) : (
                                <RadioButtonUncheckedIcon /> 
                            )}
                        </IconButton>
                        <Button variant="contained" color="secondary" onClick={() => setCurrentTask(task)} sx={{ mr: 1 }}>
                            Edit
                        </Button>
                        <IconButton edge="end" onClick={() => handleDelete(task._id)} sx={{ color: 'error.main' }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;
