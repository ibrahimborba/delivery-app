const saleService = require('../service/sale');

const create = async (req, res) => {
  const { userEmail } = req;

  const id = await saleService.create({ ...req.body, userEmail });

  if (!id) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  return res.status(201).json({ id });
};

const getSales = async (req, res) => {
  try {
    const result = await saleService.getSales();

    if (!result) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await saleService.getSalesById(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  create,
  getSalesById,
  getSales,
};