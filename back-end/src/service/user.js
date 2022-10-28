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

const create = async ({ email, password, name, role }) => {
  const userAlreadyExist = user.findOne({ where: { email } });

  if (userAlreadyExist) {
    return null;
  }

  const { id } = await user.create(
    {
      email,
      password: md5(password),
      name,
      role,
    },
  );
  
  return { id, email, name, role };
};

module.exports = {
  getUser,
  create,
};