import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, createTheme, ThemeProvider } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:3001/api';

const fetchTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#6a1b9a',
        },
        secondary: {
            main: '#ff4081',
        },
        background: {
            default: '#f3d6f0', 
        },
        text: {
            primary: '#333',
            secondary: '#757575',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h4: {
            fontWeight: 'bold',
        },
    },
});

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
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', pt: 5 }}> 
                <Container>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5 }}> 
                        Task Manager
                    </Typography>
                    <Box sx={{ mt: 6 }}> 
                        <TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} refreshTasks={refreshTasks} />
                        <Box sx={{ mt: 4 }}>
                            <TaskList tasks={tasks} setTasks={setTasks} setCurrentTask={setCurrentTask} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default App;
