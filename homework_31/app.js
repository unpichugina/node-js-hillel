const express = require('express');
const userRoutes = require('./routes/userRoutes');
const db = require('./db/db');

const app = express();
app.use(express.json());
app.use(userRoutes);

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = db.users.find(
        u => u.email === email && u.password === password
    );
    if (!user) return res.status(401).json({message: 'Unauthorized'});

    res.json({token: 'mock-token', userId: user.id});
});

app.get('/profile', (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'Bearer mock-token') {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const user = db.users[0];
    res.json({id: user.id, name: user.name, email: user.email});
});

module.exports = app;
