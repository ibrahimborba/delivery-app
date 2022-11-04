const userService = require('../service/admin');

const INTERNAL_SERVER_ERROR = 'Internal Server Error';

const create = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const result = await userService.create({ email, password, name, role });

    if (!result) return res.status(409).json({ message: 'Conflict' });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  create,
};