// Import the required modules
const express = require('express');
const router = express.Router();
const { logger, logLogin, logLogout } = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const passport = require('passport');
const { search, searchResults } = require('../services/searchLogic.js');
const isAuthentic = require('../middleware/authMiddleware.js');
const { authenticateUser, signUpUser } = require('../services/pg.customers.dal.js');

// List of All Available Routes
logger.info('Router - API Endpoints:');
logger.info('=========================');
logger.info('Route: / - GET/READ - Home Page');
logger.info('Route: /login/ - GET/READ - Login Page');
logger.info('Route: /signup/ - GET/READ - Sign Up Page');
logger.info('Router - API Endpoints:');
logger.info('=========================');
logger.info('Route: / - GET/READ - Home Page');
logger.info('Route: /login/ - GET/READ - Login Page');
logger.info('Route: /signup/ - GET/READ - Sign Up Page');

// Home Page Route
router.get('/', isAuthentic, (req, res) => {
  try {
    logger.info('Rendering the Home Page.');
    res.render('index.ejs', { user: req.user });
  } catch (error) {
    logger.error('Error rendering the Home Page:', error);
    res.status(500).render('503');
  }
});

// Login Page Routes
router.get('/login/', (req, res) => {
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
    // Authenticate the user
    const user = await authenticateUser(req.body.username, req.body.password);
    if (user) {
      req.login(user, function(err) {
        if (err) {
          logger.error('Error in login:', err);
          res.render('login', { error: 'An error occurred during login.' });
        } else {
          logLogin(user.customer_id);
          logger.info('User is authenticated. Redirecting to Home Page.');
          res.redirect('/');
        }
      });
    // If the user is not found, render the login page with an error message
    } else {
      res.render('login', { error: 'Invalid username or password.' });
    }
  // If an error occurs, render the login page with an error message
  } catch (error) {
    logger.error('Error in login:', error);
    res.render('login', { error: 'An error occurred during login.' });
  }
});

// Signup Routes
router.get('/signup/', (req, res) => {
  try {
    // Render the Sign Up Page
    logger.info('Rendering the Sign Up Page.');
    res.render('signUp');

  // If an error occurs, render the 503 page
  } catch (error) {
    logger.error('Error rendering the Sign Up Page:', error);
    res.status(500).render('503');
  }
});

router.get('/logout/', (req, res) => {
  logLogout(req.user.customer_id);
  req.logout();
  res.redirect('/login');
});
router.post('/signup/', async (req, res) => {
  logger.info('Adding a new user:', req.body);
  try {
    // Add a new user
    const { first_name, last_name, email, ph_num, gender, pay_method, street_address, city, province, postal_code, country, username, password } = req.body;
    const newUser = await signUpUser({ first_name, last_name, email, ph_num, gender, pay_method, street_address, city, province, postal_code, country, username, password });
    const newCustomerId = newUser.newCustomer.customer_id;
    res.render('signUp', { newCustomerId, newUser });

  // If an error occurs, render the 503 page
  } catch (error) {
    logger.error('Error adding a new user:', error);
    res.status(500).render('503');
  }
});

// Signup Success Page
router.get('/signup/success/', isAuthentic, (req, res) => {
  try {
    // Render the Sign Up Success Page
    logger.info('Rendering the Sign Up Success Page.');
    res.render('signUpSuccess', { newCustomerId: req.query.newCustomerId, newUser: req.query.newUser });

  // If an error occurs, render the 503 page
  } catch (error) {
    logger.error('Error rendering the Sign Up Success Page:', error);
    res.status(500).render('503');
  }
});

// Logout Route
router.get('/logout/', isAuthentic, (req, res) => {
  try {
    // Log the user out
    req.logout();
    req.flash('success_msg', 'You are logged out');
    logger.info('User is logged out. Redirecting to Login Page.');
    res.redirect('/login/');

  // If an error occurs, render the 503 page
  } catch (error) {
    logger.error('Error in logout:', error);
    res.status(500).render('503');
  }
});

// Export the router
module.exports = router;
