var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    const products = [
        {name: 'Ноутбук', price: 20000, available: true},
        {name: 'Навушники', price: 1500, available: true},
        {name: 'Монітор', price: 7000, available: false}
    ];

    res.render('products', {title: 'Товари в магазині', products});
});

module.exports = router;
