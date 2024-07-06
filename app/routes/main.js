const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth/index');
const MainController = require('../controllers/main/home');
const validate = require('../validators/validate');

// Auth routes
router.get('/register', AuthController.registerView);
router.post('/register', validate.registerValidator, AuthController.register);
router.get('/login', AuthController.loginView);
router.post('/login', AuthController.login);

// Main routes
router.get('/', MainController.Index);

module.exports = router;
