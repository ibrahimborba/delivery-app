const { Op } = require('sequelize');
const md5 = require('md5');
const { user } = require('../database/models');

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
  
  return { email, name, role };
};

module.exports = {
  create,
};