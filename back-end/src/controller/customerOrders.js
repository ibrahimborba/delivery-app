const customerService = require('../service/customerOrders');
const userServices = require('../service/user');

const getUserSales = async (req, res) => {
  try {
    const userId = await userServices.getUserId(req.query.email);
    const userOrders = await customerService.getSalesByUserId(userId);
    return res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getUserSales };