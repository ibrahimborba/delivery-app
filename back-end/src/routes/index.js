const user = require('./user');
const seller = require('./seller');
const products = require('./products');
const customer = require('./customer');
const customerOrders = require('./customerOrders');
const admin = require('./admin');

module.exports = {
  user,
  products,
  customerOrders,
  seller,
  customer,
  admin,
};
