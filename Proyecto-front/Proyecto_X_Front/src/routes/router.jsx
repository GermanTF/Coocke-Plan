import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Layout from '../components/Layout/Layout.jsx';
import FormRecipe from '../components/FormRecipe/RecipeForm.jsx';

import { Home } from '../pages/Home.jsx';
import ErrorPage from '../components/ErrorPage/ErrorPage.jsx';
import Products from '../components/Products/ProductList.jsx';
import PrivateLayout from '../components/PrivateLayout/PrivateLayout.jsx';
import Cart from '../components/Products/Cart.jsx';

import { RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'add_recipe', element: <FormRecipe /> },
      { path: 'products', element: <Products /> },
      {
        path: 'admin',
        element: <PrivateLayout />,
      },
      { path: 'cart', element: <Cart /> },
      { path: 'main', element: <Home /> },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
