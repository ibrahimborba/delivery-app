const { sales } = require('../database/models');

const getTenProducts = async () => {
    const result = await sales.findAll({limit:10});
  
    if (!result) return null;
  
    return result
  };

  module.exports = {
    getTenProducts
  };