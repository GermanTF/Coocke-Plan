import axios from 'axios';

// URL base de tu API
const API_URL = 'http://localhost:3000';

// Obtener items del carrito
const getCartItemsFromDB = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/carts?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token se envía
            }
        });
        console.log('Datos obtenidos del API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items from API:', error);
        throw error;
    }
};

// Crear carrito (si es necesario)
const createCartInDB = async (userId) => {
    console.log("crear carrito: ", userId);
    try {
        const response = await axios.post(`${API_URL}/carts`, { userId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token se envía
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating cart in API:', error);
        throw error;
    }
};

// Agregar item al carrito
const addItemToCartInDB = async (cartId, product) => {
    console.log('Apiaaaa: ', cartId, product);
    try {
        const response = await axios.post(`${API_URL}/carts/${cartId}/items`, {
            product_id: product.id,
            quantity: product.quantity
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token se envía
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart in API:', error);
        throw error;
    }
};

// Eliminar item del carrito
const removeItemFromCartInDB = async (cartId, itemId) => {
    try {
        const response = await axios.delete(`${API_URL}/carts/${cartId}/items/${itemId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token se envía
            }
        });
        if (response.status === 200) {
            console.log('Producto eliminado correctamente de la base de datos');
        } else {
            console.error('Error al eliminar el producto, estado de respuesta:', response.status);
        }
    } catch (error) {
        console.error('Error al eliminar el producto de la base de datos:', error);
        throw error; // Asegúrate de lanzar el error para manejarlo en el contexto
    }
};



// Vaciar carrito
const clearCartInDB = async (cartId) => {
    try {
        await axios.delete(`${API_URL}/carts/${cartId}/items`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token se envía
            }
        });
    } catch (error) {
        console.error('Error clearing cart in API:', error);
        throw error;
    }
};

export { getCartItemsFromDB, createCartInDB, addItemToCartInDB, removeItemFromCartInDB, clearCartInDB };
