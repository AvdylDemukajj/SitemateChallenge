import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks } from './api';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    const refreshTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Task Manager
            </Typography>
            <Box sx={{ mt: 4 }}>
                <TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} refreshTasks={refreshTasks} />
                <TaskList tasks={tasks} refreshTasks={refreshTasks} setCurrentTask={setCurrentTask} />
            </Box>
        </Container>
    );
};

export default App;
