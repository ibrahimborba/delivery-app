require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env || 'secret_key';
const JWT_OPTIONS = { expiresIn: '7d', algorithm: 'HS256' };

const create = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};

module.exports = { create, verify };