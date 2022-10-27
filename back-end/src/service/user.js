const md5 = require('md5');
const { User } = require('../database/models');

const getUser = async (email, password) => User.findOne({
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