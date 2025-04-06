const crypto = require('crypto');
const bcrypt = require('bcrypt');

const hash = crypto.createHash('sha256').update('Привіт').digest('hex');
const userInput = 'Password123';

bcrypt.compare(userInput, hash, (err, result) => {
    if (err) throw err;

    if (result) {
        console.log('Пароль правильний!');
    } else {
        console.log('Пароль неправильний!');
    }
});
