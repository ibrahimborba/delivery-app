const express = require('express');

const sellerController = require('../controller/seller');

const route = express.Router();
route.get('/seller/orders', sellerController.getTenProducts);

module.exports = route;