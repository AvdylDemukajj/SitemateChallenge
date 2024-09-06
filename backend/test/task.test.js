const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Task = require('../models/Task');

// Connect to the test database before running tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Clean up the database after each test
afterEach(async () => {
    await Task.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});