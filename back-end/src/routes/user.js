const express = require('express');

const userController = require('../controller/user');
const userValidation = require('../middlewares/user');

const route = express.Router();

route.post('/', userValidation.validateData, userController.getUser);

module.exports = route;