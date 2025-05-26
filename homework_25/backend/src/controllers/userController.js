const db = require('../db/pool');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, email, role, created_at FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const [users] = await db.query('SELECT id, email, role, created_at FROM users WHERE id = ?', [id]);
        const user = users[0];
        if (!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.createUser = async (req, res) => {
    const {email, password, role = 'user'} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [
            email,
            hashedPassword,
            role
        ]);
        res.status(201).json({message: 'User created'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {email, role} = req.body;
    try {
        await db.execute('UPDATE users SET email = ?, role = ? WHERE id = ?', [email, role, id]);
        res.json({message: 'User updated'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        await db.execute('DELETE FROM users WHERE id = ?', [id]);
        res.json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
