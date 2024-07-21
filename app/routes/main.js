const express = require('express');
const router = express.Router();
// const multer = require('../helpers/multer');
const { upload } = require('../helpers/multer');

const cookieParser = require('cookie-parser');

const AuthController = require('../controllers/auth');
const MainController = require('../controllers/home');
const UserController = require('../controllers/user');
const WheelController = require('../controllers/wheel.js');
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

// router.use(jwt.tokenCheck);  
router.get('/', MainController.Index);
//Chat routes
router.get('/chats', ChatController.chatView);
router.get('/messages/:receiverId', ChatController.getMessages);

// File upload routes
router.post('/upload-single-file', (req, res, next) => { upload.single('file')(req, res, (err) => { if (err) return upload.errorHandler(err, req, res, next); FilesController.uploadSingleFile }); });
router.post('/upload-multiple-files', (req, res, next) => { upload.array('files', 200)(req, res, (err) => { if (err) return upload.errorHandler(err, req, res, next); FilesController.uploadMultipleFiles(req, res) }); });
// File list route
router.get('/get-files', FilesController.listFiles)
//User routes
router.get('/get-users', UserController.getAllUsers)
//wheel routes
router.get('/wheel', WheelController.wheelView)
router.get('/wheel-details', WheelController.wheelDetails)
router.post('/wheel', WheelController.wheelAction)

module.exports = router;
