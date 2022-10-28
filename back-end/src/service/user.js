const md5 = require('md5');
const { user } = require('../database/models');

const getUser = async (email, password) => user.findOne({
  where: {
    email,
    password: md5(password),
  },
  attributes: {
    exclude: ['password', 'id'],
  },
});

module.exports = {
  getUser,
};