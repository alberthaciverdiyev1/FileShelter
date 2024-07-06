
const express = require('express');
const Route = express.Router();
const Auth = require('../controllers/auth/index');
const Main = require('../controllers/main/home');

// Auth controller GET
Route.route('/register').get(Auth.RegisterView);
Route.route('/login').get(Auth.LoginView);

Route.route('/').get(Main.Index)



module.exports = Route;
