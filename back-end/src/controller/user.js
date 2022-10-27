require('dotenv').config();

const userService = require('../service/user');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const webTokenSetting = { expiresIn: '7d', algorithm: 'HS256' };

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.getUser(email, password);

    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    const token = jwt.sign(
      { email },
      JWT_SECRET,
      webTokenSetting
    ); 

    return res.status(200).json({...result.dataValues, token});

  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getUser,
};