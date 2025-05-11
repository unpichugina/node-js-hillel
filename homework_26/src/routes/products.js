const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getAllProducts);
router.post('/', productsController.createProduct);
router.get('/top', productsController.getTopProducts);


module.exports = router;
