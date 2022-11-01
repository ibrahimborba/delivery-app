const token = require('../helpers/token');

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const result = token.verify(authorization);
    
    req.userEmail = result.email;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  tokenValidation,
};