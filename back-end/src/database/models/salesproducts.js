module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define("SalesProduct", {
    saleId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
    quantity: DataTypes.INTEGER,
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'SalesProducts'
  });

  SalesProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return SalesProduct;
};
