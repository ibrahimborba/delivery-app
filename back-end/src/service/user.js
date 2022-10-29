const { Op } = require('sequelize');
const md5 = require('md5');
const { user } = require('../database/models');
const tokenHelper = require('../helpers/token');

const getUser = async (email, password) => {
  const result = await user.findOne({
    where: {
      email,
      password: md5(password),
    },
    attributes: {
      exclude: ['password', 'id'],
    },
  });

  if (!result) return null;

  const token = tokenHelper.create({ email: result.email });

  return { ...result.dataValues, token };
};

const create = async ({ email, password, name }) => {
  const userAlreadyExist = await user.findOne({ where: {
    [Op.or]: [
      { email },
      { name },
    ],
  } });

  if (userAlreadyExist) {
    return null;
  }

  const result = await user.create(
    {
      email,
      password: md5(password),
      name,
      role: 'customer',
    },
  );
  
  return { email, name, role: result.role };
};

module.exports = {
  getUser,
  create,
};