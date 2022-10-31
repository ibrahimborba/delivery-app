const { sales } = require('../database/models');

const getTenProducts = async () => {
    const result = await sales.findAll();
  
    if (!result) return null;
  
    return { result };
  };

  const getProductById = async (id) => {
    const response = await sales.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  
    return response;
  };

  const update = async (id, status) => {
    await sales.findOne({ status }, { where: { id } });
  };
  module.exports = {
    getTenProducts,
    getProductById,
    update,
  };