const express = require('express');

const saleController = require('../controller/sale');
const productController = require('../controller/products');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/checkout', auth.tokenValidation, saleController.create);
route.get('/products', productController.getAll); 

route.get('/sales', saleController.getSales);
route.get('/sales/:id', saleController.getSalesById);

module.exports = route;