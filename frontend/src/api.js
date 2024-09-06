import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
};

// Create a new task
export const createTask = async (task) => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
};

// Update a task
export const updateTask = async (id, task) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
};


