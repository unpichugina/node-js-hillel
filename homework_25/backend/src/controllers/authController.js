const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/pool');
const {
    generateAccessToken,
    generateRefreshToken,
    removeRefreshToken,
    isRefreshTokenValid
} = require('../utils/tokenUtils');

exports.register = async (req, res) => {
    const {email, password} = req.body;

    try {
        const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (existing.length > 0) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        res.status(201).json({message: 'User registered'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const userPayload = {id: user.id, role: user.role || 'user'};
        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        res.json({accessToken, refreshToken});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.refresh = (req, res) => {
    const {token} = req.body;

    if (!token || !isRefreshTokenValid(token)) {
        return res.status(403).json({error: 'Invalid refresh token'});
    }

    try {
        const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken({id: user.id, role: user.role});
        res.json({accessToken});
    } catch (error) {
        res.status(403).json({error: 'Invalid token'});
    }
};

exports.logout = (req, res) => {
    const {token} = req.body;
    removeRefreshToken(token);
    res.json({message: 'Logged out'});
};
