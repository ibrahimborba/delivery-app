const { sale } = require('../database/models');

const getSalesByUserId = async (userId) => {
  const result = await sale.findAll({
    where: { userId },
  });

  if (!result) return null;

  return result;
};

module.exports = {
  getSalesByUserId,
};