const express = require('express');

const orderController = require('../controller/customerOrders');

const route = express.Router();

route.get('/customer/orders', orderController.getUserSales);

module.exports = route;