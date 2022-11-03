const express = require('express');

const userController = require('../controller/user');
const userValidation = require('../middlewares/user');

const route = express.Router();

route.post('/login', userValidation.validateData, userController.getUser);
route.post('/register', userController.create);
route.get('/seller', userController.getSellers);

module.exports = route;