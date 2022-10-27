'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2)
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  }
};