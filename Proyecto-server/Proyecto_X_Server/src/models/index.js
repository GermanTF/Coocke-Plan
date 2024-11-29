const { Sequelize } = require('sequelize');
const sequelize = require('../config/dbMySql');

const User = require('./User');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Receta = require('./Product'); // Importar el modelo Receta

// Definir las relaciones
User.hasOne(Cart, {
  foreignKey: 'user_id',
  as: 'cart'
});

Cart.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Cart.hasMany(CartItem, {
  foreignKey: 'cart_id',
  as: 'items'
});

CartItem.belongsTo(Cart, {
  foreignKey: 'cart_id',
  as: 'cart'
});

// Relación entre CartItem y Receta
Receta.hasMany(CartItem, {
  foreignKey: 'product_id',
  as: 'cartItems'
});

CartItem.belongsTo(Receta, {
  foreignKey: 'product_id',
  as: 'receta'
});

// Sincronizar todos los modelos con la base de datos
sequelize.sync().then(() => {
  console.log("Modelos sincronizados con la base de datos.");
}).catch(err => {
  console.log('Error al sincronizar los modelos: ' + err);
});

module.exports = {
  sequelize,
  User,
  Cart,
  CartItem,
  Receta
};
