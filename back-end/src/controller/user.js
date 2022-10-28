require('dotenv').config();

const jwt = require('jsonwebtoken');
const userService = require('../service/user');

const { JWT_SECRET } = process.env || 'secret_key';

const webTokenSetting = { expiresIn: '7d', algorithm: 'HS256' };

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.getUser(email, password);
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    const token = jwt.sign(
      { email },
      JWT_SECRET,
      webTokenSetting,
    );

    return res.status(200).json({ ...result.dataValues, token });
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

    const token = jwt.sign(
      { email },
      JWT_SECRET,
      webTokenSetting,
    );

    return res.status(201).json({ ...result, token });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUser,
  create,
};