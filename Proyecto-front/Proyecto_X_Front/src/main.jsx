import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { router } from './routes/router'; // Importar el enrutador
import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './Contexts/CartContext'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Contexts/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
      <RouterProvider router={router} />
      <ToastContainer />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
