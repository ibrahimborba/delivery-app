const validateData = async (req, res, next) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
  return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
}; 

module.exports = {
  validateData,
};
