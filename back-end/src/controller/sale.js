const saleService = require('../service/sale');

const create = async (req, res) => {
  const { userEmail } = req;

  const id = await saleService.create({ ...req.body, userEmail });

  if (!id) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  return res.status(201).json({ id });
};

module.exports = {
  create,
};