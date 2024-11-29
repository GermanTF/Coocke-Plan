const Product = require('../models/Product');

// Controlador para obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const list = await Product.findAll();
        res.json(list);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error');
    }
};

// Controlador para obtener productos por categoría
exports.getProductsByCategory = async (req, res) => {
    const categoria = req.query.category; // Asegúrate de que el parámetro de consulta se llama 'category'
    console.log('Selected category:', categoria); // Añade logs para depuración

    try {
        const list = await Product.findAll({
            where: {
                categoria: categoria // Ajusta a 'categoria' para que coincida con tu base de datos
            }
        });
        console.log('Filtered products:', list); // Añade logs para verificar los productos filtrados
        res.json(list);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).send('Server Error');
    }
};

// Controlador para añadir una receta (producto)
exports.addRecipe = async (req, res) => {
  try {
    console.log('Datos recibidos en el controlador (req.body):', req.body);
    const { nombre, descripcion, instrucciones, imagen_url, author, author_profile, recipe_url, rating, precio, categoria } = req.body;

    if (!nombre || !descripcion || !instrucciones || !imagen_url || !author || !author_profile || !recipe_url || !rating || !precio || !categoria) {
      return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
    }

    const recipeData = {
      nombre,
      descripcion,
      instrucciones,
      imagen_url,
      author,
      author_profile,
      recipe_url,
      rating,
      precio,
      categoria,
    };

    console.log('Datos preparados para la inserción (recipeData):', recipeData);

    const recipe = await Product.create(recipeData);
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    console.error('Error creando la receta:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// Función para eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }

    await product.destroy();
    console.log(`Producto con ID ${id} eliminado`);
    res.json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};
