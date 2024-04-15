const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const passport = require('passport');
const { search, searchResults } = require('../services/searchLogic.js');
const  isAuthenticated = require('../middleware/authMiddleware.js');
const { authenticateUser, signUpUser } = require('../services/pg.customers.dal.js');


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

// Routes for sign up page
router.get('/signup/', (req, res) => {
  try {
    logger.info('Rendering the Sign Up Page.');
    const newUser = req.query.newUser;
    const newCustomerId = req.query.newCustomerId;
    res.render('signUp', { newUser, newCustomerId });
  } catch (error) {
    logger.error('Error rendering the Sign Up Page:', error);
    res.status(500).render('503');
  }
});
router.post('/signup/', async (req, res) => {
  logger.info('Adding a new user:', req.body);
  try {
    const { first_name, last_name, email, ph_num, gender, pay_method } = req.body.newUser;
    const { street_address, city, province, postal_code, country } = req.body.newUserAddress;
    const { username, password } = req.body.newUserAccount;
    const newUser = await signUpUser({ first_name, last_name, email, ph_num, gender, pay_method, street_address, city, province, postal_code, country, username, password });
    const newCustomerId = newUser.newCustomer.customer_id;
    res.render('signUp', { newCustomerId, newUser });
  } catch (error) {
    logger.error('Error adding a new user:', error);
    res.status(500).render('503');
  }
});

// Sign Up Success Page
router.get('/signup/success/', (req, res) => {
  try {
  logger.info('Rendering the Sign Up Success Page.');
  res.render('signUpSuccess', { newCustomerId: req.query.newCustomerId, newUser: req.query.newUser });
  } catch (error) {
    logger.error('Error rendering the Sign Up Success Page:', error);
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


module.exports = router;