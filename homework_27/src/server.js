require('dotenv').config();
const express = require('express');
const app = express();
const connect = require('./db');

const studentsRoutes = require('./routes/students');

app.use(express.json());
app.use('/students', studentsRoutes);

const PORT = process.env.PORT || 3000;
connect().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
