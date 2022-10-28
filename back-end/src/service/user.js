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

const create = async ({ email, password, name }) => {
  const userAlreadyExist = await user.findAll({ where: {
    [Op.or]: [
      { email },
      { name },
    ],
  } });

  if (userAlreadyExist) {
    return null;
  }

  const { id } = await user.create(
    {
      email,
      password: md5(password),
      name,
      role: "customer",
    },
  );
  
  return { id, email, name, role: "customer" };
};

module.exports = {
  getUser,
  create,
};