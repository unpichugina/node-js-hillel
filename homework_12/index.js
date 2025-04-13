const express = require('express');
const tasksRouter = require('./routes/tasks');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use('/tasks', tasksRouter);

app.use((req, res) => {
    res.status(404).json({error: 'Not Found'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});