const { Op } = require('sequelize');
const md5 = require('md5');
const { user } = require('../database/models');
const tokenHelper = require('../helpers/token');

const create = async ({ email, password, name, role }) => {
  const userAlreadyExist = await user.findOne({ where: {
    [Op.or]: [
      { email },
      { name },
    ],
  } });

  if (userAlreadyExist) return null;

  await user.create(
    {
      email,
      password: md5(password),
      name,
      role,
    },
  );

   const token = tokenHelper.create({ email });
  
  return { email, name, role, token };
};

module.exports = {
  create,
};