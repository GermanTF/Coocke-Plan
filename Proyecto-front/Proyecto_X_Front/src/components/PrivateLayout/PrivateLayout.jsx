import React from 'react';
import { Navigate, Outlet, useOutletContext} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {Home} from '../../pages/Home';
import styles from '../PrivateLayout/PrivateLayout.module.css';

const PrivateLayout = () => {
  const { user, handleLogout } = useOutletContext();
  //console.log('Rendering PrivateLayout with user:', user);

  return (
    <>
      {user ? (
        <>
          {/*{console.log('Rendering PrivateLayout with user:', user)}*/}
          <main className={`content ${styles.mainContent}`}>
            <Container >
              <div>
                <Home />
                <Outlet context={{ user, handleLogout }}/>
              </div>
            </Container>
          </main>
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

export default PrivateLayout;
