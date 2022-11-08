const express = require('express');

const adminController = require('../controller/admin');
const adminValidation = require('../middlewares/admin');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/register', auth.tokenValidation, adminValidation.validateData, adminController.create);
route.get('/manage', adminController.getUsersAndSellers);
route.delete('/manage/:email', adminController.removeUser);

module.exports = route;