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
          res.render('login', { error: 'An error occurred during login.' });
        } else {
          logLogin(user.customer_id);
          logger.info('User is authenticated. Redirecting to Home Page.');
          res.redirect('/');
        }
      });
    } else {
      res.render('login', { error: 'Invalid username or password.' });
    }
  } catch (error) {
    logger.error('Error in login:', error);
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
    const { first_name, last_name, email, ph_num, gender, pay_method, street_address, city, province, postal_code, country, username, password } = req.body;
    const newUser = await signUpUser({ first_name, last_name, email, ph_num, gender, pay_method, street_address, city, province, postal_code, country, username, password });
    const newCustomerId = newUser.newCustomer.customer_id;
    res.render('signUp', { newCustomerId, newUser });
  } catch (error) {
    logger.error('Error adding a new user:', error);
    res.status(500).render('503');
  }
});

// Signup Success Page
router.get('/signup/success/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Sign Up Success Page.');
    res.render('signUpSuccess', { newCustomerId: req.query.newCustomerId, newUser: req.query.newUser });
  } catch (error) {
    logger.error('Error rendering the Sign Up Success Page:', error);
    res.status(500).render('503');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  logger.info('Logging out the user.');

  // If using sessions, this will destroy the session
  req.session.destroy((err) => {
    if (err) {
      logger.error('Error destroying session:', err);
      return res.status(500).render('503');
    }
    
    // After destroying the session, log the user out
    req.logout();
    res.redirect('/login');
  });
});









module.exports = router;
