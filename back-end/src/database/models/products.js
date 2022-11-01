module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING(200)
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'products'
  });

  product.associate = (models) => {
    product.hasMany(models.salesProduct,
      { foreignKey: 'productId', as: 'productsSold' });
  };

  return product;
};