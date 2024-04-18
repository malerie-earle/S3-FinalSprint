const express = require('express');
const router = express.Router();
const { logger, logLogin, logLogout } = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const passport = require('passport');
const { search, searchResults } = require('../services/searchLogic.js');
const isAuthenticated = require('../middleware/authMiddleware.js');
const { authenticateUser, signUpUser } = require('../services/pg.customers.dal.js');

// List of All Available Routes
logger.info('Router - API Endpoints:');
logger.info('=========================');
logger.info('Route: / - GET/READ - Home Page');
logger.info('Route: /login/ - GET/READ - Login Page');
logger.info('Route: /signup/ - GET/READ - Sign Up Page');

// Home Page
router.get('/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Home Page.');
    res.render('index.ejs', { user });
  } catch (error) {
    logger.error('Error rendering the Home Page:', error);
    res.status(500).render('503');
  }
});

router.post('/login/', async (req, res) => {
  try {
    logger.info('Authenticating the user:', req.body);
    const user = await authenticateUser(req.body.username, req.body.password);
    if (user) {
      logLogin(user.customer_id);
      logger.info('User is authenticated. Redirecting to Home Page.');
      res.render('index.ejs', { user });
    } else {
      logger.error('User is not authenticated. Redirecting to Login Page.');
      res.render('login', { error: 'Invalid username or password.' });
    }
  } catch (error) {
    logger.error('Error in login:', error);
    res.status(500).render('503');
  }
});

// Logout Page
router.get('/logout/', isAuthenticated, (req, res) => {
  try {
    req.logout();
    const logoutMessage = 'You are logged out';
    logger.info('User is logged out. Redirecting to Login Page.');
    req.flash('info', logoutMessage); // Use flash messages to send the logout message
    res.redirect('/login/');
  } catch (error) {
    logger.error('Error in logout:', error);
    res.status(500).render('503');
  }
});


// Sign Up Page
router.get('/signup/', (req, res) => {
  try {
    logger.info('Rendering the Sign Up Page.');
    res.render('signup');
  } catch (error) {
    logger.error('Error rendering the Sign Up Page:', error);
    res.status(500).render('503');
  }
});

router.post('/signup', async (req, res) => {
  try {
    logger.info('Adding a new user:', req.body);
    const { first_name, last_name, email, ph_num, gender, pay_method, street_address, city, province, postal_code, country, username, password } = req.body;
    const newUser = await signUpUser({ first_name, last_name, email, ph_num, gender, pay_method, street_address, city, province, postal_code, country, username, password });
    const newCustomerId = newUser.newCustomer.customer_id;
    res.render('signupSuccess', { newCustomerId, newUser });
  } catch (error) {
    logger.error('Error adding a new user:', error);
    res.status(500).render('503');
  }
});

// Logout Page
router.get('/logout', isAuthenticated, (req, res) => {
  try {
    req.logout();

    const logoutMessage = 'You are logged out';
    logger.info('User is logged out. Redirecting to Login Page.');
    res.redirect('/login/', { logoutMessage });
  } catch (error) {
    logger.error('Error in logout:', error);
    res.status(500).render('503');
  }
});


module.exports = router;
