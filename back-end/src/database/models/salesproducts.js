module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define("salesProduct", {
    saleId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
    quantity: DataTypes.INTEGER,
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'sales_products'
  });

  salesProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      as: 'products',
      through: salesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.product.belongsToMany(models.sale, {
      as: 'sales',
      through: salesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return salesProduct;
};
