var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    const users = [
        {name: 'Анна', age: 29, email: 'anna@example.com'},
        {name: 'Іван', age: 28, email: 'ivan@example.com'},
        {name: 'Марія', age: 22, email: 'mariia@example.com'}
    ];

    res.render('users', {title: 'Список користувачів', users});
});

module.exports = router;
