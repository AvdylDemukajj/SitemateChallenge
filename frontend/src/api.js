import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Function to handle errors
const handleError = (error) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
        throw new Error('No response received from the server');
    } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        throw new Error('An error occurred while setting up the request');
    }
};

// Fetch all tasks
export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to fetch tasks');
    } catch (error) {
        handleError(error);
    }
};

// Create a new task
export const createTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, task);
        if (response.status === 201) {
            return response.data;
        }
        throw new Error('Failed to create task');
    } catch (error) {
        handleError(error);
    }
};

// Update a task
export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, task);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to update task');
    } catch (error) {
        handleError(error);
    }
};

// Delete a task
export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${id}`);
        if (response.status === 204) {
            return;
        }
        throw new Error('Failed to delete task');
    } catch (error) {
        handleError(error);
    }
};
