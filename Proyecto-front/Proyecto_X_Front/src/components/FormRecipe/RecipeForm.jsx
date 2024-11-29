import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import styles from './recipeForm.module.css';
import { toast } from 'react-toastify';
import icono_eliminar from '../../assets/images/RecentRecipees/eliminar.svg';

import { CartContext } from '../../Contexts/CartContext';
import { Navigate, useOutletContext } from 'react-router-dom';

const RecipeForm = () => {
  const { user } = useOutletContext();
  const { removeFromCart } = useContext(CartContext);
  const [recipe, setRecipe] = useState({
    nombre: '',
    descripcion: '',
    instrucciones: `Paso 1: Agregar agua...\nPaso 2: Mezcle bien...\nPaso 3: Cocine a fuego lento...`,
    imagen_url: '',
    author: '',
    author_profile: '',
    recipe_url: '',
    rating: '',
    precio: '',
    categoria: ''
  });
  const [recipes, setRecipes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/product/list');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      toast.success('Receta Eliminada con Exito');
      //removeFromCart(id);
      await axios.delete(`http://localhost:3000/product/delete/${id}`);
      fetchRecipes(); // Refrescar la lista de recetas después de la eliminación
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast.error('Receta No Eliminada');
    }
  };

  //funcion para el boton Agregar Producto
  const handleSubmit = async (e) => {
    toast.success('Receta Agregada con Exito');
    e.preventDefault();
    
    const recipeData = {
      nombre: recipe.nombre,
      descripcion: recipe.descripcion,
      instrucciones: recipe.instrucciones,
      imagen_url: recipe.imagen_url,
      author: recipe.author,
      author_profile: recipe.author_profile,
      recipe_url: recipe.recipe_url,
      rating: recipe.rating,
      precio: recipe.precio,
      categoria: recipe.categoria
    };

    console.log('Datos enviados:', recipeData);

    try {
      const response = await axios.post('http://localhost:3000/product/add', recipeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error('Network response was not ok');
      }

      console.log('Receta enviada:', response.data);
    } catch (error) {
      console.error('Error al enviar la receta:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      {user ? (
        <>
          <Container fluid className="w-75 mt-5 py-5"> 
            <Row> 
              <Col md={12}>
                <div className="d-flex flex-column pb-3 mb-4 border-bottom border-secondary">
                  <Row className="w-100 d-flex align-items-center">
                      <Col xs={12} md={6} className="d-flex justify-content-center">
                          <h5 className={`w-75 text-center ${styles.h5}`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '80%' }}>
                              Agregar Recetas
                          </h5>
                      </Col>
                      <Col xs={12} md={6} className="d-flex justify-content-center">
                          <Button 
                              variant="danger" 
                              className="w-75" 
                              style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '80%' }}
                              onClick={() => setShowDeleteModal(true)}>
                              Eliminar Recetas
                          </Button>
                      </Col>
                  </Row>
                </div>
                <form className={styles.formContainer} onSubmit={handleSubmit}> 
                  <div className={styles.formGroup}> 
                    <label>Nombre de la Receta:</label> 
                    <input type="text" name="nombre" value={recipe.nombre} onChange={handleChange} required /> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>Descripción:</label> 
                    <textarea name="descripcion" value={recipe.descripcion} onChange={handleChange} required></textarea> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>Instrucciones:</label> 
                    <textarea 
                      name="instrucciones" 
                      value={recipe.instrucciones} 
                      onChange={handleChange} 
                      required >
                    </textarea> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>URL de la Imagen:</label> 
                    <input type="text" name="imagen_url" value={recipe.imagen_url} onChange={handleChange} required /> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>Autor:</label> 
                    <input type="text" name="author" value={recipe.author} onChange={handleChange} required /> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>Perfil del Autor:</label> 
                    <input type="text" name="author_profile" value={recipe.author_profile} onChange={handleChange} required /> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>URL de la Receta:</label> 
                    <input type="text" name="recipe_url" value={recipe.recipe_url} onChange={handleChange} required /> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>Calificación:</label> 
                    <input type="number" name="rating" value={recipe.rating} onChange={handleChange} required /> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>Precio:</label> 
                    <input type="number" step="0.01" name="precio" value={recipe.precio} onChange={handleChange} required /> 
                  </div> 

                  <div className={styles.formGroup}> 
                    <label>Categoría:</label> 
                    <input type="text" name="categoria" value={recipe.categoria} onChange={handleChange} required /> 
                  </div> 

                  <button type="submit" className={styles.buttonSubmit}>Agregar Producto</button> 
                </form>
              </Col>
            </Row> 
          </Container>
              <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Eliminar Recetas</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>Recetas Disponibles</h5>
                <ul className={styles.recipeList}>
                  {recipes.map((recipe) => (
                    <li key={recipe.id} className={styles.recipeItem}>
                      <Button variant="outline-primary" size='sm' onClick={() => handleDelete(recipe.id)} className={`btn-xs ${styles.buttonEliminar}`}>
                        <img 
                          src={icono_eliminar} 
                          width="20" 
                          height="20" 
                          className="d-inline-block align-top" 
                          alt="Icono Eliminar" 
                        /> 
                      </Button>
                      {recipe.nombre}
                    </li>
                  ))}
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
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

export default RecipeForm;
