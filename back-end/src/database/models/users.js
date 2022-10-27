module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    role: DataTypes.STRING(255),
  },
  {
    timestamps: false,
    tableName: 'Users'
  });

  User.associate = (models) => {
    User.hasMany(models.Sale,
      { foreignKey: 'userId', as: 'sales' },
      { foreignKey: 'sellerId', as: 'sales' });
  };

  return User;
};