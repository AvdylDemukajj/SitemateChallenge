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

describe('CRUD Task Endpoints', () => {

    // Test Create
    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({
                    name: 'New Task',
                    completed: false
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.name).toBe('New Task');
        });

    });
    it('should return a validation error if required fields are missing', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({});
        expect(res.statusCode).toEqual(500); 
        expect(res.body).toHaveProperty('error');
    });

    // Test Read
    describe('GET /api/tasks', () => {
        it('should fetch a random task', async () => {
            const task = new Task({ name: 'Task 1', completed: false });
            await task.save();

            const res = await request(app).get('/api/tasks');
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toBe('Task 1');
        });

        it('should return a message if no tasks are found', async () => {
            const res = await request(app).get('/api/tasks');
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('No tasks found');
        });
    });
});