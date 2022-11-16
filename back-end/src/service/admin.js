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

const getUsersAndSellers = async () => user.findAll({
  where: {
    role: {
      [Op.or]: ['seller', 'customer'],
    },
  },
  attributes: { exclude: ['password'] },
});

const removeUser = async (email) => {
  const userToRemove = await user.findOne({ where: { email } });
  if (!userToRemove) return null;
  await user.destroy({ where: { email } });
  return userToRemove;
};

module.exports = {
  create,
  getUsersAndSellers,
  removeUser,
};