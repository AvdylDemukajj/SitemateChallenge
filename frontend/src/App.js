import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:3001/api';

// Fetch all tasks
const fetchTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];  // Sigurohu që të dhënat janë një array
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];  // Kthe një array të zbrazët në rast gabimi
    }
};

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
