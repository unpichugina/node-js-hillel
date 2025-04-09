const bcrypt = require('bcrypt');

const plainPassword = 'Password123';
const userInput = 'Password';

bcrypt.hash(plainPassword, 10, (err, hash) => {
    if (err) throw err;

    bcrypt.compare(userInput, hash, (err, result) => {
        if (err) throw err;

        if (result) {
            console.log('Пароль правильний!');
        } else {
            console.log('Пароль неправильний!');
        }
    });
});
