const express = require('express');
const router = express.Router();
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
//Upload
// router.post('/upload-single-file',validate.singleFileValidator, FilesController.uploadSingleFile);
router.post('/upload-multiple-files',validate.multipleFileValidator, FilesController.uploadMultipleFiles);

module.exports = router;
