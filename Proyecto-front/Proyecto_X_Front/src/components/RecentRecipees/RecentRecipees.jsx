import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';

import stylesRecentRecipees from './RecentRecipees.module.css';
import Card from 'react-bootstrap/Card';
import stylesCards from './cards.module.css';
import star from '../../assets/images/RecentRecipees/star.png';

export default function RecentRecipees() {
    const [products, setProducts] = useState([]);
    const { authUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const selectedProductRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:3000/product/list')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        if (location.state && location.state.selectedProduct) {
            setSelectedProduct(location.state.selectedProduct);
            setModalShow(true);
        }
    }, [location.state]);

    const handleCardClick = (product) => {
        if (authUser) {
            navigate('/products', { state: { selectedProduct: product } });
        } else {
            toast.error('Favor, Iniciar Sesión');
            navigate('/main');
        }
    };

    const sortByDateAndRating = (a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        if (a.rating > b.rating) return -1;
        if (a.rating < b.rating) return 1;
        return 0;
    };

    const filteredProducts = products
        .sort(sortByDateAndRating)
        .slice(0, 3);

    if (!products || products.length === 0) {
        return <p>No hay recetas recientes disponibles.</p>; // Manejo de un caso sin datos
    }

    return (
        <div>
            <h2 className={stylesRecentRecipees.title} id="Title">Recetas Recientes</h2>
            <section className={stylesRecentRecipees.cardsList}>
                {filteredProducts.map((product) => (
                    <Card key={product.id} className="mb-4 d-flex">
                        <div ref={product.id === selectedProduct?.id ? selectedProductRef : null} className={`d-flex flex-column align-items-stretch h-100 w-100 ${stylesCards.card}`} onClick={() => handleCardClick(product)}>
                            <Card.Title className={stylesCards.customTitle}>
                                {product.nombre}
                            </Card.Title> 
                            <div className={stylesCards.imgContainer}>
                                <Card.Img variant="top" src={product.imagen_url} className={`img-thumbnail ${stylesCards.customCard_img}`} />                
                            </div>
                            <Card.Body className={stylesCards.customBody}>
                                <div className='star'>
                                    <img src={star} className='star' alt="star icon" />
                                    {product.rating}
                                </div>        
                                <Card.Text className={stylesCards.customCardText}>
                                    {product.descripcion}
                                </Card.Text>
                            </Card.Body>
                        </div>
                    </Card>
                ))}
            </section>
        </div>
    );
}
