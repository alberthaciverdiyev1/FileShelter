const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');
const cookieParser = require('cookie-parser');

const AuthController = require('../controllers/auth');
const MainController = require('../controllers/home');
const UserController = require('../controllers/user');
const FilesController = require('../controllers/files');
const ChatController = require('../controllers/chat.js');
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
//Chat routes
router.get('/chats', ChatController.chatView);
router.get('/messages/:senderId/:receiverId', ChatController.getMessages);
router.post('/messages/:senderId/:receiverId', ChatController.sendMessage);

// File upload routes
router.post('/upload-single-file', (req, res, next) => { multer.single('file')(req, res, (err) => { if (err) return multer.errorHandler(err, req, res, next); FilesController.uploadSingleFile }); });
router.post('/upload-multiple-files', (req, res, next) => { multer.array('files', 200)(req, res, (err) => { if (err) return multer.errorHandler(err, req, res, next); FilesController.uploadMultipleFiles(req, res) }); });
// File list route
router.get('/get-files', FilesController.listFiles)
//User routes
router.get('/get-users', UserController.getAllUsers)

module.exports = router;
