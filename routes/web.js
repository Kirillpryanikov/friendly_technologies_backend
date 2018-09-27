const express = require('express');
const Router = express.Router();
const UserController = require('@controller/UserController');
const AuthMiddleware = require('@middleware/AuthMiddleware');

Router.post('/register', UserController.register.bind(UserController));
Router.post('/login', UserController.login.bind(UserController));

Router.get('/users', AuthMiddleware.auth, UserController.getUsers.bind(UserController));

module.exports = Router;
