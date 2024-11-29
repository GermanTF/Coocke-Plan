import React from 'react'; 
import { useOutletContext } from 'react-router-dom'; 

const AdminPage = () => { 
  const { user, handleLogout } = useOutletContext();
  console.log('Rendering AdminPage with user:', user);
  return (
    <div className="container mt-5">
      <h1>Pagina de Administracion</h1>
      {user && (
        <>
          <p>Usuario conectado: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      )}
      <button onClick={handleLogout} className='btn btn-secondary mt-2'>Logout</button>
    </div>
  );
}

export default AdminPage;
