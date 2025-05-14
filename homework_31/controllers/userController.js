const userService = require('../services/userService');
const db = require('../db/db');

async function createUser(req, res) {
    const user = await userService.createUser(req.body);
    res.status(201).json({id: user.id, name: user.name, email: user.email});
}

async function getOrderCount(req, res) {
    const userId = req.params.id;
    const user = db.users.find(u => u.id === userId);
    if (!user) return res.status(404).json({message: 'User not found'});

    const count = db.orders.filter(o => o.userId === userId).length;
    res.json({count});
}

module.exports = {createUser, getOrderCount};
