require('dotenv').config();

const userService = require('../service/user');

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.getUser(email, password);

    if (!result) return res.status(404).json({ message: 'Not found' });

    return res.status(200).json({ ...result });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Internal server error' });
  }
};

const create = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const result = await userService.create({ email, password, name });

    if (!result) {
      return res.status(409).json({ message: 'Conflict' });
    }

    return res.status(201).json({ ...result });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUser,
  create,
};