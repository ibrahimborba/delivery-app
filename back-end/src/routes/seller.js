const express = require('express');

const sellerController = require('../controller/seller');

const route = express.Router();
route.get('/seller/orders', sellerController.getTenProducts);
route.get('/seller/orders/:id', sellerController.getProductById);
route.patch('/seller/orders/:id', sellerController.update);

module.exports = route;