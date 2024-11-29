// ./components/ErrorPage.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="display-4">¡Oops! Página no encontrada</h1>
      <p className="lead">Lo sentimos, la página que estás buscando no existe.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Regresar a la página principal
      </Button>
    </Container>
  );
};

export default ErrorPage;