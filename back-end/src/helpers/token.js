require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');

const JWT_OPTIONS = { expiresIn: '7d', algorithm: 'HS256' };
const JWT_SECRET = process.env.JWT_SECRET
  || fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const create = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};

module.exports = { create, verify };