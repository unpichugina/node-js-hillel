const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');

router.get('/', controller.getAllOrders);
router.post('/', controller.createOrder);
router.get('/total', controller.getTotalRevenue);


module.exports = router;
