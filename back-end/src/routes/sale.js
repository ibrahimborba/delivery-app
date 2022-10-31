const express = require('express');

const saleController = require('../controller/sale');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/checkout', auth.tokenValidation, saleController.create);

module.exports = route;