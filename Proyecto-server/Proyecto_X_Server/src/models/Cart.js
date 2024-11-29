const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMySql');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Nombre de la tabla a la que hace referencia
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'carts',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Cart;
