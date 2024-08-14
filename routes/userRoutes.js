const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Home route
router.get('/', (req, res) => res.render('home'));

// Registration routes
router.get('/register', (req, res) => res.render('register'));
router.post('/register', userController.register);

// Login routes
router.get('/login', (req, res) => res.render('login'));
router.post('/login', userController.login);

// Logout route
router.get('/logout', userController.logout);

module.exports = router;

