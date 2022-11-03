const { sale } = require('../database/models');

const getTenProducts = async () => {
  const result = await sale.findAll();
  
    if (!result) return null;
  
    return result;
  };

  const getProductById = async (id) => {
    const response = await sale.findOne({
      where: { id },      
    });
  
    return response;
  };

  const update = async (id, status) => {
    await sale.findOne({ status }, { where: { id } });
  };

  module.exports = {
    getTenProducts,
    getProductById,
    update,
  };