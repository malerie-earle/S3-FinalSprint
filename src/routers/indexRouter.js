const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const passport = require('passport');
const { search, searchResults } = require('../services/searchLogic.js');
const  isAuthenticated = require('../middleware/authMiddleware.js');
const { authenticateUser } = require('../services/pg.customers.dal.js');


// List of All Available Routes
logger.info('Index Router - API Endpoints:');
logger.info('Route: GET/READ - Home Page - /');
logger.info('Route: GET/READ - Login Page - /login/');
logger.info('Route: GET/READ - Registration Page - /registration/');


// Home Page
router.get('/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Home Page.');
    res.render('index.ejs');
  } catch (error) {
    logger.error('Error rendering the Home Page:', error);
    res.status(500).render('503');
  }
  });


// Login Page
router.get('/login/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Login Page.');
    res.render('login');
  } catch (error) {
    logger.error('Error rendering the Login Page:', error);
    res.status(500).render('503');
  }
});

router.post('/login/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login/',
  failureFlash: true
}));



// Routes for registration page
router.get('/registration/', (req, res) => {
  try {
  logger.info('Rendering the Registration Page.');
  res.render('registration', { messages: req.flash('error') });
  } catch (error) {
    logger.error('Error rendering the Registration Page:', error);
    res.status(500).render('503');
  }
  });


module.exports = router;