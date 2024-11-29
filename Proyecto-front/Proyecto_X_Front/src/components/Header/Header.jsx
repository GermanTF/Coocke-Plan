import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/images/ImagesHeader/logo.png';
import icono_inicio from '../../assets/images/ImagesHeader/inicio.svg';
import icono_recetas from '../../assets/images/ImagesHeader/recetas.svg';
import icono_servicios from '../../assets/images/ImagesHeader/servicios.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import stylesHeader from '../Header/Header.module.css';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'

function Header({ user }) {

  const handleLinkClick = (e, linkName) => {
    if (!user) {
      e.preventDefault(); // Prevenir navegación si no está logueado
      toast.error(`Inicia sesión para ${linkName}`);
    }
  };

  return (
    <div>
      <Navbar expand="lg" variant="dark" className={`${stylesHeader.navbarHeader} fixed-top`}>
        <Navbar.Brand href="#">
          <img
            src={logo}
            width="70"
            height="70"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <span className={stylesHeader.sloganText}>• Sabores que inspiran, momentos que recuerdan •</span>
      </Navbar>

      {/* Ajusta este div que contiene el menú horizontal */}
      <div className={`${stylesHeader.horizontalMenu} d-flex`}>
        <Nav className="ml-auto"> {/* Cambiado para alinear los links a la izquierda */}
          <Nav.Link as={Link} to='/main' className={stylesHeader.navLink}>
            <img src={icono_inicio} width="20" height="20" alt="Inicio" />Inicio
          </Nav.Link>
          <Nav.Link as={Link} to='/add_recipe' className={stylesHeader.navLink} onClick={(e) => handleLinkClick(e, "Agregar Receta")}>
            <img src={icono_servicios} width="20" height="20" alt="Servicios" />Agregar receta
          </Nav.Link>
          <Nav.Link as={Link} to='/products' className={stylesHeader.navLink} onClick={(e) => handleLinkClick(e, "Ver Recetas")}>
            <img src={icono_recetas} width="20" height="20" alt="Recetas" />Recetas
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default Header;
