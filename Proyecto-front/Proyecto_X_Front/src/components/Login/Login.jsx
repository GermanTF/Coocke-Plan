import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'; // Para JavaScript - en nuestro caso, uso de Bootstrap-Dropdowns
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Navbar, Button, Form, Modal, Row, Col} from 'react-bootstrap';
import icono_email from '../../assets/images/ImagesHeader/envelope.svg';
import icono_password from '../../assets/images/ImagesHeader/lock.svg';
import icono_usersForm from '../../assets/images/ImagesHeader/userForm.svg';
import stylesLogin from '../Login/Login.module.css';

import {FaFacebook, FaGoogle} from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

import icono_users from '../../assets/images/ImagesHeader/user.svg';
import icono_carritoCompra from '../../assets/images/ImagesHeader/carritoCompra.svg';

import { AuthContext } from '../../Contexts/AuthContext'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'

const MyLogin = ({ user, onLogout }) => {
    const [isActive, setIsActive] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const formLoginRef = useRef(null);
    const formRegisterRef = useRef(null);
    const { authLogin, authRegister } = useContext(AuthContext);
    const navigate = useNavigate(); 

    
    
    const handleClick = () => {
        setIsActive(true);
        setIsRegistering(false);
    };

    const handleCloseClick = () => {
        setIsActive(false);
    };

    const handleClickCartCarrito = () => {
        if (user) 
            { navigate('/cart'); } 
        else { 
            toast.error('Inicia Seccion para ver tú Carrito de Compra');
        } 
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await authLogin(email, password);
            if (result.success) {
                toast.success('Inicio de sesión exitoso');
                setIsActive(false);
                navigate('/');
            } else {
                throw new Error(result.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            toast.error(error.message || 'Error en el inicio de sesión');
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await authRegister(username, email, password);
            if (result.success) {
                toast.success('Registro exitoso. Ahora puedes iniciar sesión.');
                setIsRegistering(false);
                // Resetear los campos de registro
                setUsername('');
                setEmail('');
                setPassword('');
                // Cerrar el modal de registro y abrir el de inicio de sesión
                //setIsActive(false); 
                setIsActive(true);  
            } else {
                throw new Error(result.message || 'Error en el registro');
            }
        } catch (error) {
            toast.error(error.message || 'Error en el registro');
        }
    };
    
    
    const handleRegisterLinkClick = () => {
        formLoginRef.current.reset();
        setIsRegistering(true);
    };

    const handleLoginLinkClick = () => {
        formRegisterRef.current.reset();
        setIsRegistering(false);
    };

    /*****************************************************************/
    const handleLoginGoogle = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleLoginFacebook = () => {
        window.location.href = 'http://localhost:3000/auth/facebook';
    };
    /*****************************************************************/

    return (
        <>
        <div className="container">
            <Navbar expand="md" variant="dark" className={`${stylesLogin.navbarLogin} navbar-custom fixed-top`}>
                <Navbar.Brand href="#">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                        <Navbar.Collapse className="justify-content-end">
                            {user ? (
                                <div className="header-right col-md-auto">
                                    <div className={`row ${stylesLogin.icono}`}>
                                      <div className="col d-flex align-items-center cursor-pointer">
                                        <div className="me-2">
                                          <div className="text-end">
                                            <div className="fw-bold fs-6 mb-0" style={{ color: "#000000"}}>{user.username}</div>
                                            <div className="text-muted">
                                              <small style={{ color: "#000000" }}>{user.email}</small>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="position-relative">
                                          <div className="dropdown">
                                            <img
                                              data-bs-toggle="dropdown" aria-expanded="false"
                                              className="me-5 avatar rounded-circle bg-l25-warning dropdown-toggle"
                                              src={user.photo}
                                              alt="Avatar"
                                              width="40"
                                              height="40"
                                              id='avatar'
                                              style={{color: "#000000", cursor:"pointer"}}
                                            />
                                            <ul className={`dropdown-menu ${stylesLogin.customLeft}`} aria-labelledby="avatar">
                                                <li><button className="dropdown-item" onClick={() => alert('Settings clicked')}>Setting</button></li>
                                                <li><button className="dropdown-item" onClick={(onLogout)}>Logout</button></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="dropdown-item" onClick={() => alert('Separate link clicked')}>Enlace separado</button></li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Button variant="outline-primary" onClick={handleClickCartCarrito} className={stylesLogin.buttonCarritoCompra}> 
                                        <img 
                                            src={icono_carritoCompra} 
                                            width="20" 
                                            height="20" 
                                            className="d-inline-block align-top" 
                                            alt="Icono Carrito Compra" 
                                        /> 
                                    </Button>
                                </div>
                            ) : (
                                <>
                                <Button variant="outline-primary" onClick={handleClick} className={stylesLogin.buttonLogin}>
                                    <img 
                                        src={icono_users} 
                                        width="20"
                                        height="20"
                                        className="d-inline-block align-top"
                                        alt="Icono de usuario"
                                     />
                                </Button>
                            
                                <Button variant="outline-primary" onClick={handleClickCartCarrito} className={stylesLogin.buttonCarritoCompra}>
                                    <img 
                                        src={icono_carritoCompra} 
                                        width="20"
                                        height="20"
                                        className="d-inline-block align-top"
                                        alt="Icono Carrito Compra"
                                     />
                                </Button>
                                </>
                            )}
                        </Navbar.Collapse>
                </Navbar.Brand>
            </Navbar>
            {user ? (
                    <Navigate to="/admin" />
                ) : (
                    <Modal show={isActive} onHide={handleCloseClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {!isRegistering ? (
                                <div>
                                    <Form onSubmit={handleLoginSubmit} ref={formLoginRef}>
                                        {/* para validar */}
                                        <Form.Floating className="mb-3">
                                            <Form.Control
                                                id='floatingInputCustomLoginEmail'
                                                type='email'
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='name@example.com'
                                                className={stylesLogin.form_control_custom}
                                                required
                                            />
                                            <label htmlFor="floatingInputCustomLoginEmail" className={stylesLogin.floating_label}>
                                                  <img src={icono_email} alt="correo electrónico" />
                                                  <span>Correo electrónico</span>
                                            </label>
                                        </Form.Floating>
                                        <Form.Floating className="mb-3">
                                          <Form.Control
                                            id="floatingInputCustomLoginPassword"
                                            type="password"
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Contraseña"
                                            className={stylesLogin.form_control_custom}
                                            required
                                          />
                                          <label htmlFor="floatingInputCustomLoginPassword" className={stylesLogin.floating_label}>
                                            <img src={icono_password} alt="contraseña" />
                                            <span>Contraseña</span>
                                          </label>
                                        </Form.Floating>
                                        <Row className="g-3">
                                            <Col xs={6} md={6}>
                                                <Form.Group controlId="formBasicCheckbox" className="mb-3">
                                                    <Form.Check type="checkbox" label="Recordar Sesión" />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6} md={6}>
                                                <div className="text-center mb-3">
                                                    <p>¿No tienes cuenta? <a href="#" onClick={handleRegisterLinkClick}>Registrarse</a></p>
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                        <Button variant="primary" type="submit" className="mb-3 w-100">
                                            Iniciar Sesión
                                        </Button>
        
                                    </Form>
                                    <div className="text-center mb-3">
                                        <p>Or Login in with</p>
                                    </div>
                                    <Row className="g-3">
                                        <Col xs={12} md={6}>
                                          <Button onClick={handleLoginGoogle} variant="danger" type="submit" className="w-100 mb-3">
                                            <FaGoogle className="me-2" />
                                            <span translate="no">Google</span>
                                          </Button>
                                        </Col>
                                        <Col xs={12} md={6}>
                                          <Button onClick={handleLoginFacebook} type="submit" variant="primary" className="w-100">
                                            <FaFacebook className="me-2" />
                                            <span translate="no">Facebook</span>
                                          </Button>
                                        </Col>
                                    </Row>  
                                </div>
                            ) : (
                                <Form onSubmit={handleRegisterSubmit} ref={formRegisterRef}>
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            id='floatingInputCustomRegisUsername'
                                            type='text'
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder='Nombre de Usuario'
                                            className={stylesLogin.form_control_custom}
                                            required
                                        />
                                        <label htmlFor="floatingInputCustomRegisUsername" className={stylesLogin.floating_label}>
                                              <img src={icono_usersForm} alt="Username" />
                                              <span>Nombre de Usuario</span>
                                        </label>
                                    </Form.Floating>
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            id='floatingInputCustomRegisEmail'
                                            type='email'
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='name@example.com'
                                            className={stylesLogin.form_control_custom}
                                            required
                                        />
                                        <label htmlFor="floatingInputCustomRegisEmail" className={stylesLogin.floating_label}>
                                              <img src={icono_email} alt="correo electrónico" />
                                              <span>Correo electrónico</span>
                                        </label>
                                    </Form.Floating>
                                    <Form.Floating className="mb-3">
                                      <Form.Control
                                        id="floatingInputCustomRegisPassword"
                                        type="password"
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Contraseña"
                                        className={stylesLogin.form_control_custom}
                                        required
                                      />
                                      <label htmlFor="floatingInputCustomRegisPassword" className={stylesLogin.floating_label}>
                                        <img src={icono_password} alt="contraseña" />
                                        <span>Contraseña</span>
                                      </label>
                                    </Form.Floating>
                                    <Form.Group controlId="formBasicCheckbox" className="mb-3">
                                        <Form.Check type="checkbox" label="Acepto los términos y condiciones" required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Registrarse
                                    </Button>
                                    <div className="text-center mt-3">
                                        <p>¿Ya tienes cuenta? <a href="#" onClick={handleLoginLinkClick}>Iniciar Sesión</a></p>
                                    </div>
                                </Form>
                            )}
                        </Modal.Body>
                    </Modal>
                )
            }
        </div>
        </>             
    )
};      

export default MyLogin;
