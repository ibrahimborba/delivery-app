const Sequelize = require('sequelize');
const config = require('../database/config/config');

const { sale, salesProduct, product, user } = require('../database/models');

const sequelize = new Sequelize(config.development);

const getSales = async () => {
  const result = await salesProduct.findAll({
    include: [{ model: product, as: 'products' }],
  });

    if (!result) return null;

    return result;
  };

const createSaleProducts = async ({ products, saleId }, t) => {
  const data = [];

  products.forEach((productSold) =>
    data.push({ productId: productSold.id, saleId, quantity: productSold.quantity }));

  await salesProduct.bulkCreate(
    data,
    { transaction: t },
  );
};

const getUserId = async (email) => {
  const { dataValues } = await user.findOne({ where: { email } });

  return dataValues.id;
};

const createSale = async (
  { sellerId, totalPrice, deliveryAddress, deliveryNumber, userEmail }, t) => {
  const userId = await getUserId(userEmail);

  const saleResult = await sale.create(
    {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    },
    { transaction: t },
  );

  return saleResult;
};

const create = async ({ sellerId, totalPrice, deliveryAddress,
  deliveryNumber, products, userEmail }) => {
  const t = await sequelize.transaction();

  try {
    const saleResult = await createSale({
      userEmail,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber, 
    }, t);

    await createSaleProducts({ products, saleId: saleResult.id }, t);

    await t.commit();

    return saleResult.id;
  } catch (error) {
    await t.rollback();
    
    console.error(error);
    
    return null;
  }
};

module.exports = {
  getSales,
  create,
};