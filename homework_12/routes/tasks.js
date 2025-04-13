const express = require('express');
const {readTasks, writeTasks} = require('../utils/fileHandler');

const router = express.Router();

const isValidStatus = (status) => ['todo', 'in-progress', 'done'].includes(status);

router.get('/', async (req, res) => {
    let tasks = await readTasks();
    const {status} = req.query;

    if (status && isValidStatus(status)) {
        tasks = tasks.filter(task => task.status === status);
    }

    res.json(tasks);
});

router.get('/sorted', async (req, res) => {
    const {by} = req.query;
    const tasks = await readTasks();

    if (by === 'createdAt') {
        tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) return res.status(404).json({error: 'Task not found'});
    res.json(task);
});

router.post('/', async (req, res) => {
    const {title, description, status} = req.body;

    if (!title || title.length < 3) return res.status(400).json({error: 'Title must be at least 3 characters'});
    if (!isValidStatus(status)) return res.status(400).json({error: 'Invalid status'});

    const tasks = await readTasks();
    const newTask = {
        id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title,
        description,
        status,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
});

router.put('/:id', async (req, res) => {
    const {title, description, status} = req.body;
    if (!title || title.length < 3 || !isValidStatus(status)) {
        return res.status(400).json({error: 'Invalid data'});
    }

    const tasks = await readTasks();
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({error: 'Task not found'});

    tasks[index] = {
        ...tasks[index],
        title,
        description,
        status
    };

    await writeTasks(tasks);
    res.json(tasks[index]);
});

router.patch('/:id/status', async (req, res) => {
    const {status} = req.body;
    if (!isValidStatus(status)) return res.status(400).json({error: 'Invalid status'});

    const tasks = await readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({error: 'Task not found'});

    task.status = status;
    await writeTasks(tasks);

    res.json(task);
});

router.delete('/:id', async (req, res) => {
    let tasks = await readTasks();
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

    if (index === -1) return res.status(404).json({error: 'Task not found'});

    const deleted = tasks.splice(index, 1);
    await writeTasks(tasks);

    res.json(deleted[0]);
});

module.exports = router;