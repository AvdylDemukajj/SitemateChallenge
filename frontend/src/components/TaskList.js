import React from 'react';
import { List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask } from '../api';

const TaskList = ({ tasks, refreshTasks, setCurrentTask }) => {
    const handleDelete = async (id) => {
        await deleteTask(id);
        refreshTasks();
    };

    return (
        <List>
            {tasks.map((task) => (
                <ListItem key={task._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText primary={task.name} secondary={`Completed: ${task.completed}`} />
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
