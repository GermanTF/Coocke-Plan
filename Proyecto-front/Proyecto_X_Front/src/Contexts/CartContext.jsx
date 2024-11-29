import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    getCartItemsFromDB,
    createCartInDB,
    addItemToCartInDB,
    removeItemFromCartInDB,
    clearCartInDB
} from '../API/cartApi';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);
    const userId = localStorage.getItem('userId'); // Obtener userId desde el almacenamiento local o autenticación

    useEffect(() => {
        const fetchCartItems = async () => {
            if (userId) {
                try {
                    const cart = await getCartItemsFromDB(userId);
                    if (cart) {
                        console.log('Datos obtenidos del API:', cart); // Log para depuración
                        const updatedItems = cart.items.map(item => {
                            const product = item.receta;
                            return {
                                ...item,
                                nombre: product.nombre,
                                descripcion: product.descripcion,
                                instrucciones: product.instrucciones,
                                imagen_url: product.imagen_url,
                                precio: parseFloat(product.precio) || 0, // Asegúrate de que precio sea un número válido
                                quantity: item.quantity // Asegúrate de incluir la cantidad aquí
                            };
                        });
                        setCartItems(updatedItems);
                        setCartId(cart.id);
                    }
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchCartItems();
    }, [userId]);

    const refreshCart = async () => {
        try {
            const cart = await getCartItemsFromDB(userId);
            if (cart) {
                const updatedItems = cart.items.map(item => {
                    const product = item.receta;
                    return {
                        ...item,
                        nombre: product.nombre,
                        descripcion: product.descripcion,
                        instrucciones: product.instrucciones,
                        imagen_url: product.imagen_url,
                        precio: parseFloat(product.precio) || 0,
                        quantity: item.quantity // Asegúrate de usar la cantidad correcta
                    };
                });
                setCartItems(updatedItems);
                setCartId(cart.id);
                console.log('Carrito actualizado:', updatedItems); // Log para depuración
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const addToCart = async (product) => {
        try {
            if (!cartId) {
                const newCart = await createCartInDB(userId);
                setCartId(newCart.id);
            }

            const existingItem = cartItems.find(item => item.product_id === product.id);
            if (existingItem) {
                // Actualiza la cantidad
                await updateQuantity(product.id, existingItem.quantity + 1);
            } else {
                await addItemToCartInDB(cartId, { id: product.id, quantity: 1 });
                setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
                toast.success('El Producto ha sido agregado al carrito');
            }

            // Actualiza el carrito con los datos más recientes del API
            await refreshCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            console.log('Intentando eliminar el producto con ID:', productId); // Log para depuración
            await removeItemFromCartInDB(cartId, productId);
            setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
            toast.success('Producto eliminado del carrito');
            // Actualiza el carrito con los datos más recientes del API
            await refreshCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
            // Mostrar error si ocurre aquí
            toast.error('Error eliminando el producto');
        }
    };

    const clearCart = async () => {
        try {
            await clearCartInDB(cartId);
            setCartItems([]);
            toast.success('El carrito ha sido vaciado');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }; 

    const getCartItems = () => cartItems;

    const updateQuantity = async (productId, newQuantity) => {
        console.log('cartCon: ', productId, newQuantity)
        try {
            await addItemToCartInDB(cartId, { id: productId, quantity: newQuantity });
            toast.info(`Cantidad del producto actualizada a ${newQuantity}`);

            // Actualiza el carrito con los datos más recientes del API
            await refreshCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartItems, clearCart, updateQuantity, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
};
