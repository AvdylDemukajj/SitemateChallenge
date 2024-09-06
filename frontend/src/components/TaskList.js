import React from 'react';
import { List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

const TaskList = ({ tasks, refreshTasks, setCurrentTask }) => {
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        refreshTasks();
    };

    if (!Array.isArray(tasks)) {
        console.error('Expected tasks to be an array but got:', tasks);
        return null;  // Mund të rikthehet një komponent i veçantë ose thjesht `null`
    }

    return (
        <List>
            {tasks.map((task) => (
                <ListItem key={task._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText 
                        primary={task.title} 
                        secondary={`Description: ${task.description}`} 
                    />
                    <Button onClick={() => setCurrentTask(task)}>Edit</Button>
                    <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;
