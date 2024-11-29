const { Cart, CartItem } = require('../models');
const Receta = require('../models/Product'); // Importa el modelo Receta

// Crear o reutilizar un carrito existente
const createCart = async (req, res) => {
  const userId = req.user.id;
  try {
    // Verificar si el usuario ya tiene un carrito
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el carrito', error });
  }
};

// Obtener carrito del usuario autenticado
const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: {
        model: CartItem,
        as: 'items',
        include: {
          model: Receta,
          as: 'receta'
        }
      }
    });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error });
  }
};


// Añadir artículo al carrito
const addItemToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const userId = req.user.id; // Asumiendo que el middleware de autenticación añade el ID del usuario al objeto req

    // Verifica que el producto exista
    const product = await Receta.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verifica si el usuario ya tiene un carrito
    let cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      // Crea un nuevo carrito para el usuario si no existe
      cart = await Cart.create({ user_id: userId });
    }

    // Verifica si el producto ya está en el carrito
    let cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id } });

    if (cartItem) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      // Si el producto no está en el carrito, crea una nueva entrada
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id,
        quantity
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error al añadir artículo al carrito:', error);
    res.status(500).json({ message: 'Error al añadir artículo al carrito', error });
  }
};

// Eliminar artículo del carrito
const removeItemFromCart = async (req, res) => {
  const { cartId, itemId } = req.params;
  try {
    // Verificar si el artículo existe en el carrito
    const cartItem = await CartItem.findOne({ where: { cart_id: cartId, id: itemId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    // Eliminar el artículo del carrito
    await CartItem.destroy({ where: { cart_id: cartId, id: itemId } });
    res.status(200).json({ message: 'Artículo eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar artículo del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar artículo del carrito', error });
  }
};

module.exports = {
  createCart,
  getCart,
  addItemToCart,
  removeItemFromCart
};
