const express = require('express');
const router = express.Router();
const mercadopagoController = require('../controllers/mercadopagoController');

router.post('/crear-pago', mercadopagoController.crearPago);
module.exports = router;