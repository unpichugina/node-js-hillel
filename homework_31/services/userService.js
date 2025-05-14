const db = require('../db/db');

async function getUserById(id) {
    return db.users.find(u => u.id === id);
}

async function createUser({name, email, password}) {
    const user = {id: String(Date.now()), name, email, password};
    db.users.push(user);
    return user;
}

module.exports = {getUserById, createUser};
