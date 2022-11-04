const { sale, product, user } = require('../database/models');

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
    await sale.update({ status }, { where: { id } });

    const result = await sale.findByPk(id, {
      include: [
        { model: product, as: 'products' },
        { model: user, as: 'seller' },
      ],
    });
  
    if (!result) return null;

    return result;
  };

  module.exports = {
    getTenProducts,
    getProductById,
    update,
  };