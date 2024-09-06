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
        <>
        </>
    );
};

export default TaskList;
