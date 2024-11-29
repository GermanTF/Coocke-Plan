const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const validateCartItem = require('../middleware/validateCartItem');
const {
  createCart,
  getCart,
  addItemToCart,
  removeItemFromCart
} = require('../controllers/CartContoller');

// Rutas para el carrito
router.post('/carts', isAuthenticated, createCart);
router.get('/carts', isAuthenticated, getCart);
router.post('/carts/:cartId/items', isAuthenticated, validateCartItem, addItemToCart);
router.delete('/carts/:cartId/items/:itemId', isAuthenticated, removeItemFromCart);

module.exports = router;
