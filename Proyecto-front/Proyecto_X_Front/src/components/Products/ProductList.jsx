import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import { Navigate, useOutletContext } from 'react-router-dom';
import { Button, Container, Row, Col, Modal, Image, Form, Offcanvas } from 'react-bootstrap';
import stylesRecetas from '../Products/ProductList.module.css';
import star from '../../assets/images/RecentRecipees/star.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const { user } = useOutletContext();
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const location = useLocation();

    const [products, setProducts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false); // Estado para controlar el Offcanvas
    const selectedProductRef = useRef(null);

    console.log('CartItem:', cartItems);

    if (!cartItems && !user) {
        console.log('Esperando datos...');
    }

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setModalShow(true);
    };

    // Función para manejar el cambio de orden 
    const handleSortChange = (e) => { 
        const sortBy = e.target.value; 
        let sortedProducts; 
        if (sortBy === "price") { 
            sortedProducts = [...products].sort((a, b) => a.precio - b.precio); 
        } else if (sortBy === "rating") { 
            sortedProducts = [...products].sort((a, b) => b.rating - a.rating); 
        } else { sortedProducts = products; } setProducts(sortedProducts); 
    }; 
    
    // Función para manejar el cambio de categoría 
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        console.log(`Selected category: ${category}`);
    
        if (category) {
            fetch(`http://localhost:3000/product/list/categoria?category=${encodeURIComponent(category)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Filtered products:', data);
                    setProducts(data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        } else {
            fetch('http://localhost:3000/product/list')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('All products:', data);
                    setProducts(data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        }
    };

    // Función para mostrar el Offcanvas del recetario
    const handleShowOffcanvas = () => {
        setShowOffcanvas(true);
    };

    // Función para ocultar el Offcanvas del recetario
    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
    };


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


    const handleClose = () => setModalShow(false);

    // Función para formatear las instrucciones 
    const formatInstructions = (instructions) => { 
        const pasos = instructions.split(/(Paso \d+:)/).filter(Boolean); 
        return pasos.map((paso, index) => { 
            if (paso.startsWith('Paso')) { 
                return <h5 key={index} style={{ fontWeight: 'bold', marginLeft: '10px', marginRight: '10px'}}>• {paso}</h5>; 
            } return <p key={index} style={{ textAlign: 'justify', marginLeft: '20px', marginRight: '20px'}}>{paso}</p>; }); 
    };

    return (
        <>
            {user ? (
                <>
                    <Container fluid className="w-75 mt-5 text-white py-5">
                        <Row>
                            <Col md={12}>
                                <div className="d-flex pb-3 mb-4 border-bottom border-secondary"> 
                                    <Row className='col-md-12'> 
                                        <Col md={5}> 
                                            <Form.Select className="me-3 flex-fill fw-medium text-light-dark" onChange={handleSortChange}> 
                                                <option value="">Ordenar por</option> 
                                                <option value="price">Precio</option> 
                                                <option value="rating">Calificaciones</option> 
                                            </Form.Select> 
                                        </Col> 
                                        <Col md={5}> 
                                            <Form.Select className="me-3 flex-fill fw-medium text-light-dark" onChange={handleCategoryChange}> 
                                                <option value="">Categoria</option> 
                                                <option value="Recetas Saladas">Recetas Saladas</option> 
                                                <option value="Recetas Especiales">Recetas Especiales</option> 
                                                <option value="Recetas Temporalidades">Recetas Temporalidades</option> 
                                                <option value="Postres">Postres</option> 
                                            </Form.Select> 
                                        </Col> 
                                        <Col md={2}> 
                                            <Button className="w-100 btn-secondary" onClick={handleShowOffcanvas}>Ver Recetario</Button> 
                                        </Col> 
                                    </Row> 
                                </div>
                                <Row className="mb-n4">
                                    {products.map(product => (
                                        <Col xs={12} sm={6} lg={4} className="mb-4 d-flex" key={product.id}>
                                            <div ref={product.id === selectedProduct?.id ? selectedProductRef : null} className={`d-flex flex-column align-items-stretch h-100 w-100 ${stylesRecetas.card}`} onClick={() => handleCardClick(product)}>
                                                <a className="d-block position-relative text-decoration-none mt-3 mb-3" href="#">
                                                    <span className="position-absolute top-0 start-0 badge bg-primary bg-gradient border border-dark">Nuevo</span>
                                                    <div className={stylesRecetas.imgContainer}>
                                                        <img 
                                                            src={product.imagen_url} 
                                                            className="img-thumbnail" 
                                                            style={{ width: '220px', height: '150px', objectFit: 'cover' }} 
                                                            alt={product.nombre} 
                                                        />
                                                    </div>
                                                    <div className="mt-2 d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <img src={star} alt="rating star" className={stylesRecetas.star} />
                                                            <span className="text-muted ms-2">{product.rating}</span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex ms-4 flex-column align-items-start mt-2">
                                                        <h6 className="mb-1">{product.nombre}</h6>
                                                        <span className="fs-6 fw-medium text-muted">Desde ${parseFloat(product.precio).toFixed(2)}</span>
                                                    </div>
                                                    <div className={stylesRecetas.customCardText}>{product.descripcion}</div>
                                                </a>
                                                <Button variant="primary" className="w-100 mt-auto" onClick={(e) => { e.stopPropagation(); addToCart(product) }}>Agregar al Recetario</Button>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    {selectedProduct && (
                        <Modal show={modalShow} onHide={handleClose} size='lg'>
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedProduct.nombre}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col md={6}>
                                        <div className={stylesRecetas.imgContainer}>
                                        <Image 
                                            src={selectedProduct.imagen_url} 
                                            className="img-thumbnail" 
                                            style={{ width: '420px', height: '200px', objectFit: 'cover' }} 
                                            alt={selectedProduct.nombre} 
                                        />
                                        </div>
                                    </Col>      
                                    <Col md={6}>
                                        <h5>Rating: 
                                            <img src={star} alt="rating star" style={{ width: '20px', marginLeft: '5px', marginRight: '5px' }} />
                                            {selectedProduct.rating}
                                        </h5>
                                        <h5>Precio: ${parseFloat(selectedProduct.precio).toFixed(2)}</h5>
                                        <p style={{ marginTop: '25px' }}>{selectedProduct.descripcion}</p>
                                    </Col>
                                </Row>
                                <h5 style={{ marginTop: '25px' }}>Instrucciones:</h5> 
                                {selectedProduct.instrucciones && formatInstructions(selectedProduct.instrucciones)}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={(e) => { e.stopPropagation(); addToCart(selectedProduct) }}>
                                    Agregar al Recetario
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                    <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Recetario</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {cartItems.length > 0 ? (
                                <>
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="mb-3 d-flex align-items-center">
                                            <Image src={item.imagen_url} thumbnail style={{ width: '80px', height: '80px' }} />
                                            <div className="ms-3 d-flex flex-column align-items-start">
                                                <h5 className="mb-1">{item.nombre}</h5>
                                                <p className="mb-1">Precio: ${parseFloat(item.precio).toFixed(2)}</p>
                                                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p>Tu recetario está vacío.</p>
                            )}
                        </Offcanvas.Body>
                    </Offcanvas>

                </>
            ) : (
                <>
                    {console.log('Rendering Navigate to home because user is null')}
                    <Navigate to="/" />
                </>
            )}
        </>
    );
};

export default ProductList;
