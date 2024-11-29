import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Container, Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import MyLogin from '../Login/Login';
import { Footer } from '../Footer/Footer';
import { AuthContext } from '../../Contexts/AuthContext';
import styles from './layout.module.css';

const Layout = () => {
  const { authUser, setAuthUser, authLogout } = useContext(AuthContext);

  useEffect(() => {
    // Verificar si hay datos en localStorage
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const photo = localStorage.getItem('photo');
    const ID = localStorage.getItem('ID');

    if (token && username && email && ID) {
      setAuthUser({ token, username, email, photo, ID });
      //console.log('Datos de autenticación:', { token, username, email, ID });
    } else {
      console.log('No hay datos de autenticación en localStorage');
    }
  }, [setAuthUser]);

  return (
    <>
      <Header user={authUser} />
      <Container className='mt-4'>
        <MyLogin user={authUser} onLogout={authLogout} className={styles.myLogin} />
        <Card className={`py-5 px-4 ${styles.mainContent}`}>
          <Outlet context={{ user: authUser, handleLogout: authLogout }} />
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
