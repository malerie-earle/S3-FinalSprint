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
    res.render('index.ejs', { user: req.user });
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

router.post('/login/', async (req, res) => {
  try {
    const user = await authenticateUser(req.body.username, req.body.password);
    if (user) {
      req.login(user, function(err) {
        if (err) {
          logger.error('Error in login:', err);
          res.render('login', { error: 'An error occurred during login.' }); // Render login page with error
        } else {
          logger.info('User is authenticated. Redirecting to Home Page.');
          res.redirect('/'); // Redirect to home page
        }
      });
    } else {
      logger.info('Username or password is incorrect. Redirecting to Login Page.');
      res.render('login', { error: 'Incorrect username or password.' }); // Render login page with error
    }
  } catch (error) {
    logger.error('Error in login:', error);
    res.render('login', { error: 'An error occurred during login.' }); // Render login page with error
  }
});



// Routes for login pages
router.get('/login/', (req, res) => {
  try {
  logger.info('Rendering the Login Page.');
  res.render('login', { messages: req.flash('error') });
  } catch (error) {
    logger.error('Error rendering the Login Page:', error);
    res.status(500).render('503');
  }
});



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

// Logout Route
router.get('/login/', (req, res) => {
  req.logout(); // Passport method to remove the user from the session
  req.flash('success_msg', 'You are logged out'); // Optional: Flash message for successful logout
  res.redirect('/login'); // Redirect to the login page or any other page
});



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