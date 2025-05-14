const express = require('express');
const router = express.Router();
const {createUser, getOrderCount} = require('../controllers/userController');

router.post('/users', createUser);
router.get('/users/:id/orders/count', getOrderCount);

module.exports = router;
