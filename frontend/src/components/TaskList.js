import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; // Butoni i zbrazët
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Shenja e tikut

const TaskList = ({ tasks, setTasks, setCurrentTask }) => {
    // Funksioni që përditëson gjendjen e `completed` vetëm në UI
    const completeTask = (id) => {
        const updatedTasks = tasks.map(task => 
            task._id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks); // Përditëso gjendjen e task-ëve në UI
    };

    const handleDelete = (id) => {
        const updatedTasks = tasks.filter(task => task._id !== id);
        setTasks(updatedTasks); // Përditëso listën pas fshirjes
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
                            onClick={() => completeTask(task._id)} // Përditëso statusin e kompletimit vetëm në UI
                        >
                            {task.completed ? (
                                <CheckCircleIcon sx={{ color: 'green' }} /> // Shenja e tikut kur është kompletuar
                            ) : (
                                <RadioButtonUncheckedIcon /> // Rrethi i zbrazët kur nuk është kompletuar
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
