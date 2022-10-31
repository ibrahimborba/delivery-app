const productService = require('../service/products');

const getAll = async (_req, res) => {
  try {
    const result = await productService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAll };