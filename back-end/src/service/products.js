const { product } = require('../database/models');

const getAll = async () => product.findAll();

module.exports = {
  getAll,
};