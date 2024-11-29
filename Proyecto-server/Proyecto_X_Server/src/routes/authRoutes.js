const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas existentes
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleAuthCallback, authController.redirectHome);
router.get('/auth/facebook', authController.facebookAuth);
router.get('/auth/facebook/callback', authController.facebookAuthCallback, authController.redirectHome);
router.get('/profile', authController.getProfile);
router.get('/logout', authController.logout);

// Nuevas rutas para login y registro local
router.post('/auth/login', authController.authLogin);
router.post('/auth/register', authController.authRegister);

module.exports = router;
