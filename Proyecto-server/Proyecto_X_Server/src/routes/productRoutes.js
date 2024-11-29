/*const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product/list', productController.getProducts);

module.exports= router;*/

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener todos los productos
router.get('/product/list', productController.getProducts);

// Nueva ruta para obtener productos por categoría
router.get('/product/list/categoria', productController.getProductsByCategory);

// Ruta para añadir recetas
router.post('/product/add', productController.addRecipe);

// Ruta para eliminar un producto
router.delete('/product/delete/:id', productController.deleteProduct);


module.exports = router;

