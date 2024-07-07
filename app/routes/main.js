const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');

const AuthController = require('../controllers/auth');
const MainController = require('../controllers/home');
const FilesController = require('../controllers/files');
const validate = require('../validators/validate');

// Main routes
router.get('/', MainController.Index);

// Auth routes
router.get('/register', AuthController.registerView);
router.post('/register', validate.registerValidator, AuthController.register);
router.get('/login', AuthController.loginView);
router.post('/login', AuthController.login);

// File upload routes
router.post('/upload-single-file', (req, res, next) => { multer.single('file')(req, res, (err) => { if (err) return multer.errorHandler(err, req, res, next); FilesController.uploadSingleFile }); });
router.post('/upload-multiple-files', (req, res, next) => { multer.array('files', 200)(req, res, (err) => { if (err) return multer.errorHandler(err, req, res, next); FilesController.uploadMultipleFiles(req, res) }); });
// File list route
router.get('/file-list', FilesController.listFiles)
module.exports = router;
