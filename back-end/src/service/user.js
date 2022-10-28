const { Op } = require('sequelize');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { user } = require('../database/models');

const { JWT_SECRET } = process.env || 'secret_key';
const webTokenSetting = { expiresIn: '7d', algorithm: 'HS256' };

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

  const token = jwt.sign(
    { email },
    JWT_SECRET,
    webTokenSetting,
  );

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