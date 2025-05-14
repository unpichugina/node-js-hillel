const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

const USERS_DB = './users.json';

function readUsers() {
    const data = fs.readFileSync(USERS_DB);
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));
}

app.post('/register', async (req, res) => {
    const {email, password} = req.body;
    const users = readUsers();

    if (users.find(user => user.email === email)) {
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({email, password: hashedPassword});
    writeUsers(users);

    res.status(201).json({message: 'User registered'});
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const users = readUsers();
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.json({token});
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/profile', authenticateToken, (req, res) => {
    res.json({message: `Hello, ${req.user.email}!`, user: req.user});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
