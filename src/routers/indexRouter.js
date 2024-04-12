const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const passport = require('passport');
const { search, searchResults } = require('../services/searchLogic.js');


// List of All Available Routes
logger.info('Index Router - API Endpoints:');
logger.info('Route: GET/READ - Home Page - /');
logger.info('Route: GET/READ - Login Page - /login/');
logger.info('Route: GET/READ - Registration Page - /registration/');

// Home Page
router.get('/', (req, res) => {
  logger.info('Checking if user is authenticated.')
  if (req.isAuthenticated()) {
    logger.info('Rendering the Home Page.');
    res.render('index', { user: req.user });
  } else {
    logger.info('User is not authenticated. Redirecting to Login Page.');
    res.redirect('/customer/login/');
  }
});


// GET - Search Customer Page
router.get('/customer/search/', (req, res) => {
  logger.info('Rendering the Search Customer Page.');
  res.render('searchCustomers.ejs');
});

// GET - Search Product Page
router.get('/product/search/', (req, res) => {
  logger.info('Rendering the Search Product Page.');
  res.render('searchProducts.ejs');
});

// GET - Search Engine Page
router.get('/search/', (req, res) => {
  try {
    logger.info('Rendering the Search Engine Page.');
    res.render('searchEngine.ejs', { search, searchResults });
  } catch (error) {
    logger.error('Error rendering the Search Engine Page:', error);
    res.status(500).render('503');
  }
});
// POST - Search Engine
router.post('/search/', async (req, res) => {
  try {
    const { query } = req.body; 
    const searchResults = await search(query);
    logger.info('Displaying search results:', searchResults);
    res.render('searchEngine.ejs', { searchResults: searchResults });
  } catch (error) {
    logger.error('Error occurred while handling search request:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
