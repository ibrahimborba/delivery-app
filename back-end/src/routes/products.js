const express = require('express');

const productController = require('../controller/products');

const route = express.Router();

route.get('/products', productController.getAll);

module.exports = route;