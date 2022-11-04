const express = require('express');

const adminController = require('../controller/admin');
const adminValidation = require('../middlewares/admin');

const route = express.Router();

route.post('/register', adminValidation.validateData, adminController.create);

module.exports = route;