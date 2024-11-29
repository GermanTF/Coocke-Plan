import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../components/Footer/footer.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome


export const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5">
      <Container fluid className="py-4">
        <Row>
          <Col md={4} className="text-center text-md-left mb-3 mb-md-0">
            <h5>Nosotros</h5>
            <p>
              En cook&plan nos dedicamos a ofrecer recetas que inspiran momentos inolvidables.
              Nuestro objetivo es compartir el arte culinario con el mundo, brindando un espacio
              para los amantes de la cocina.
            </p>
          </Col>
          <Col md={4} className="text-center my-3 my-md-0">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>Email: info@cookandplan.com</li>
              <li>Teléfono: +123 456 789</li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Síguenos</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://www.facebook.com/mi_pagina" className="text-white" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.twitter.com/mi_pagina" className="text-white" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com/mi_pagina" className="text-white" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center pt-3">
            <p>&copy; {new Date().getFullYear()} Cook&Plan. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};