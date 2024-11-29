const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMySql');
const Receta = require('../models/Product'); // Importa el modelo Receta

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carts',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recetas', // Establece la relación con la tabla recetas
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'cart_items',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Configura las asociaciones
Receta.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Receta, { foreignKey: 'product_id' });

module.exports = CartItem;
