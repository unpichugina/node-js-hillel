const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

const hashed = hashPassword('mySecret123');
console.log('SHA-256 хеш:', hashed);
