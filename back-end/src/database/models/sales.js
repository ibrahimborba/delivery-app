module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define("sale", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING(50), defaultValue: 'Pendente' },
  },
  {
    // underscored: true,
    timestamps: false,
    tableName: 'sales'
  });

  sale.associate = (models) => {
    sale.belongsTo(models.user,
      { foreignKey: 'userId', as: 'user' },
      { foreignKey: 'sellerId', as: 'user' });
  };

  sale.associate = (models) => {
    sale.hasMany(models.salesProduct,
      { foreignKey: 'saleId', as: 'saleProduct' });
  };

  return sale;
};