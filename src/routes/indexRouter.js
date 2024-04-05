const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');

// List of All Available Routes
logger.info('Index Router - API Endpoints:');
logger.info('Route: GET/READ - Home Page - /');
logger.info('Route: GET/READ - Login Page - /login/');
logger.info('Route: GET/READ - Registration Page - /registration/');


// Home Page
router.get('/', (req, res) => {
  logger.info('Rendering the Home Page.');
  res.render('index.ejs', { title: 'Home Page', name: 'Malerie'});
});


// Routes for Login page
router.get('/login/', (req, res) => {
  logger.info('Rendering the Login Page.');
  res.render('login');
});

// Routes for Registration page
router.get('/registration/', (req, res) => {
  logger.info('Rendering the Registration Page.');
  res.render('registration');
});

// GET - Search Customer Page
router.get('/search/', (req, res) => {
  logger.info('Rendering the Search Customer Page.');
  res.render('searchCustomers.ejs');
});

module.exports = router;
