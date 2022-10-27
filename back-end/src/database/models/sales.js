module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: { type: DataTypes.DATETIME, defaultValue: DataTypes.NOW },
    status: DataTypes.STRING(50),
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'Sales'
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' },
      { foreignKey: 'sellerId', as: 'user' });
  };

  Sale.associate = (models) => {
    Sale.hasMany(models.SalesProduct,
      { foreignKey: 'saleId', as: 'saleProduct' });
  };

  return Sale;
};