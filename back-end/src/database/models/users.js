module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    role: DataTypes.STRING(255),
  },
  {
    timestamps: false,
    tableName: 'users'
  });

  user.associate = (models) => {
    user.hasMany(models.sale,{ foreignKey: 'userId', as: 'customer' });
    user.hasMany(models.sale,{ foreignKey: 'sellerId', as: 'seller' });
  };

  return user;
};