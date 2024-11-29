const { body, validationResult } = require('express-validator');

const validateCartItem = [
  body('product_id').isInt().withMessage('El ID del producto debe ser un número entero'),
  body('quantity').isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1'),
  (req, res, next) => {
    console.log('Datos recibidos en el middleware:', req.body); // Log de datos recibidos
    const errors = validationResult(req);
    console.log('Errores de validación:', errors.array()); // Log de errores de validación
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateCartItem;
