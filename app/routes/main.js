const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');
const cookieParser = require('cookie-parser');

const AuthController = require('../controllers/auth');
const MainController = require('../controllers/home');
const FilesController = require('../controllers/files');
const validate = require('../validators/validate');
const jwt = require('../helpers/jwt'); 
router.use(cookieParser());

// Main routes

// Auth routes
router.get('/register', AuthController.registerView);
router.post('/register', validate.registerValidator, AuthController.register);
router.get('/login', AuthController.loginView);
router.post('/login', AuthController.login);

router.use(jwt.tokenCheck);
router.get('/', MainController.Index);
// File upload routes
router.post('/upload-single-file', (req, res, next) => { multer.single('file')(req, res, (err) => { if (err) return multer.errorHandler(err, req, res, next); FilesController.uploadSingleFile }); });
router.post('/upload-multiple-files', (req, res, next) => { multer.array('files', 200)(req, res, (err) => { if (err) return multer.errorHandler(err, req, res, next); FilesController.uploadMultipleFiles(req, res) }); });
// File list route
router.get('/get-files', FilesController.listFiles)
module.exports = router;
