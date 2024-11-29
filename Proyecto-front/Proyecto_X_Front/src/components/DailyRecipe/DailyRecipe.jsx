import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Carousel } from 'react-bootstrap';
import style from './dailyRecipe.module.css'; 
import { AuthContext } from '../../Contexts/AuthContext';

import { toast } from 'react-toastify';


export const DailyRecipe = () => {
    const [products, setProducts] = useState([]);
    const { authUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/product/list')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleCardClick = (product) => {
        if (authUser) {
            navigate('/products', { state: { selectedProduct: product } });
        } else {
            toast.error('Favor, Iniciar Sesión');
            navigate('/main');
        }
    };

    if (!products || products.length === 0) {
        return <p>No hay recetas disponibles.</p>;
    }

    return (
        <div className="container d-flex justify-content-center p-5">
            <Carousel data-bs-theme="dark" className={style.carousel_custom}>
                {products.map((product, index) => (
                    <Carousel.Item key={index}>
                        <Card className={`pb-5 text-center ${style.custom_card}`} onClick={() => handleCardClick(product)}>
                        <Card.Img variant="top" src={product.imagen_url} className={`img-thumbnail ${style.card_image}`} />
                            <Card.Body>
                                <Card.Title className={style.title}>{product.nombre}</Card.Title>
                                <Card.Text className={style.description}>{product.descripcion}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default DailyRecipe;
