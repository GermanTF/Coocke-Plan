import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../Contexts/CartContext';
import { Navigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

/*
    product.id se usa para identificar la fila en cart_items.
    product.product_id se usa para identificar el producto en la tabla products.
*/

const Cart = () => {
    const { user } = useOutletContext();
    const { cartItems, removeFromCart, updateQuantity, refreshCart } = useContext(CartContext);

    useEffect(() => {
        console.log("Componente montado, llamando a refreshCart");
        const fetchCartItems = async () => {
            await refreshCart();
        };

        fetchCartItems();
    }, []); // Dependencias vacías para que solo se ejecute una vez al montar

    const total = cartItems.reduce((acumulador, product) => acumulador + (product.precio * product.quantity), 0);
    const porcentajeIva = 19;
    const totalIva = Math.round(total * porcentajeIva / 100);
    const granTotal = total + totalIva;

    const handleRemove = async (productId) => {
        try {
            console.log(`Eliminando producto con ID: ${productId}`);
            await removeFromCart(productId);
            //toast.success('Producto eliminado del carrito');
        } catch (error) {
            console.error('Error removing product:', error);
            toast.error('Error eliminando el producto');
        }
    };

    const handleQuantityChange = async (productId, quantity) => {
        if (quantity > 0) {
            try {
                console.log(`Actualizando cantidad del producto con ID: ${productId} a ${quantity}`);
                await updateQuantity(productId, quantity);
                //toast.success('Cantidad del producto actualizada');
            } catch (error) {
                console.error('Error updating quantity:', error);
                toast.error('Error actualizando la cantidad');
            }
        }
    };

    const createPayment = async () => {
        const items = cartItems.map(product => ({
            title: product.nombre,
            description: product.descripcion,
            quantity: product.quantity,
            currency_id: 'COP',
            unit_price: Math.round(product.precio + (product.precio * porcentajeIva / 100))
        }));
        const paymentData = {
            items,
            email: 'test_user_123456@testuser.com'
        };

        const response = await fetch('http://localhost:3000/crear-pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });
        if (response.ok) {
            const paymentUrl = await response.text();
            window.open(paymentUrl, '_blank');
        } else {
            console.log('Error al procesar el pago');
        }
    };

    return (
        <>
            {user ? (
                <div className='container mt-5 py-5'>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Tus productos</h4>
                                </div>
                                <div className="card-body">
                                    {cartItems.length === 0 ? (
                                        <p>El Carrito está vacío</p>
                                    ) : (
                                        <>
                                            <div className="table-responsive">
                                                <table className='table table-striped'>
                                                    <thead>
                                                        <tr>
                                                            <th>Producto</th>
                                                            <th>Precio</th>
                                                            <th>Cantidad</th>
                                                            <th>Total</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cartItems.map(product => (
                                                            <tr key={product.id}>
                                                                <td>{product.nombre}</td>
                                                                <td>{parseFloat(product.precio).toFixed(2)}</td>
                                                                <td>
                                                                    <input 
                                                                        type="number" 
                                                                        className='form-control' 
                                                                        value={product.quantity}
                                                                        onChange={(e) => handleQuantityChange(product.product_id, parseInt(e.target.value))}
                                                                        min={1}
                                                                    />
                                                                </td>
                                                                <td>{(parseFloat(product.precio) * product.quantity).toFixed(2)}</td>
                                                                <td>
                                                                    <button 
                                                                        onClick={() => handleRemove(product.id)} 
                                                                        className='btn btn-danger btn-sm'
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td colSpan={2}></td>
                                                            <td>Total</td>
                                                            <td>{total.toFixed(2)}</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}></td>
                                                            <td>Iva</td>
                                                            <td>{totalIva.toFixed(2)}</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}></td>
                                                            <td>Total a pagar</td>
                                                            <td>{granTotal.toFixed(2)}</td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <button onClick={createPayment} className='btn btn-primary'>Pagar</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>      
                        </div>
                    </div>           
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
}

export default Cart;
