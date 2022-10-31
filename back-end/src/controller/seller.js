const sellerService = require('../service/seller');

const getTenProducts = async (req, res) => {
    try {
      const result = await sellerService.getTenProducts();
  
      if (!result) return res.status(404).json({ message: 'Not found' });
  
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
    getTenProducts
  };