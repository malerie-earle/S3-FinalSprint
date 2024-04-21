const express = require('express');
const router = express.Router();
const { logger, logLogin, logLogout } = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const passport = require('passport');
const { search, searchResults } = require('../services/searchLogic.js');
const isAuthenticated = require('../middleware/authMiddleware.js');
const { authenticateUser, signUpUser } = require('../services/pg.customers.dal.js');
const { addCustomer, addCustomerAccount, addCustomerAddress } = require('../services/pg.customers.dal.js');

// List of All Available Routes
logger.info('Router - API Endpoints:');
logger.info('=========================');
logger.info('Route: / - GET/READ - Home Page');
logger.info('Route: /login/ - GET/READ - Login Page');
logger.info('Route: /signup/ - GET/READ - Sign Up Page');
// Home Page
router.get('/', (req, res) => {
  console.log('Session:', JSON.stringify(req.session, null, 2)); // Log session data as JSON
  
  try {
    logger.info('Rendering the Home Page.');
    res.render('searchEngine.ejs', { user: req.user });
  } catch (error) {
    logger.error('Error rendering the Home Page:', error);
    res.status(500).render('503');
  }
});

// Index Page
router.get('/index/', isAuthenticated, (req, res) => { 
  try {
    logger.info('Rendering the Index Page.');
    res.render('index', { user: req.user });
  } catch (error) {
    logger.error('Error rendering the Index Page:', error);
    res.status(500).render('503');
  }
});

// Contact
router.get('/contact/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Contact Page.');
    res.render('contact', { user: req.user });
  } catch (error) {
    logger.error('Error rendering the Contact Page:', error);
    res.status(500).render('503');
  }
});

// Login Page
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
    const user = await authenticateUser(req.body.username, req.body.password);
    if (user) {
      req.login(user, function(err) {
        if (err) {
          logger.error('Error in login:', err);
          res.render('login', { error: 'An error occurred during login.' });
        } else {
          logLogin(user.customer_id);
          logger.info('User is authenticated. Redirecting to Home Page.');
          console.log('Session after login:', JSON.stringify(req.session, null, 2)); // Log session after login as JSON
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

// Logout route
router.get('/logout/', (req, res) => {
  logLogout(req.user.customer_id);
  
  // Log session data before destroying the session
  console.log('Session before logout:', JSON.stringify(req.session, null, 2)); // Log session before logout as JSON
  
  // If using sessions, this will destroy the session
  req.session.destroy((err) => {
    if (err) {
      logger.error('Error destroying session:', err);
      return res.status(500).render('503');
    }
    
    // Explicitly clear the session object
    req.session = null;
    
    // After destroying the session, log the user out
    req.logout(() => {
      logger.info('User logged out.');
      
      // Log session data after destroying the session
      console.log('Session after logout:', JSON.stringify(req.session, null, 2)); // Log session after logout as JSON
      
      res.redirect('/login');
    });
  });
});



// Display the Sign Up
router.get('/signup/', (req, res) => {
  logger.info('Rendering the Add Customer Page.');
  res.render('signUp');
});
router.post('/signup/', async (req, res) => {
  logger.info('Adding a new customer.');
  try {
    const newCustomer = await addCustomer(req);
    logger.info(`Successfully added a new customer.`);
    
    const newCustomerAccount = await addCustomerAccount(req, newCustomer.customer_id);
    logger.info(`Successfully added a new customer account.`);

    const newCustomerAddress = await addCustomerAddress(req, newCustomer.customer_id);
    logger.info(`Successfully added a new customer address.`);

    const newUser = {newCustomer, newCustomerAccount, newCustomerAddress};
    req.session.newUser = newUser; 
    res.redirect('/customer/all/');
    logger.info('Successfully added a new user.');
  } catch (error) {
    logger.error('Router: Error adding a new customer:', error);
    res.status(500).render('503');
  }
});

// Signup Success Page
router.get('/signup/success/', (req, res) => {
  try {
    logger.info('Rendering the Sign Up Success Page.');
    res.render('signUpSuccess', { newCustomerId: req.query.newCustomerId, newUser: req.query.newUser });
  } catch (error) {
    logger.error('Error rendering the Sign Up Success Page:', error);
    res.status(500).render('503');
  }
});

// Logout route
router.get('/logout/', (req, res) => {
  logger.info('Logging out the user.');

  // If using sessions, this will destroy the session
  req.session.destroy((err) => {
    if (err) {
      logger.error('Error destroying session:', err);
      return res.status(500).render('503');
    }
    
    // After destroying the session, log the user out
    req.logout();
    res.redirect('/login/');
  });
});


// Contact Page
router.get('/contact/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Contact Page.');
    res.render('contact', { user: req.user });
  } catch (error) {
    logger.error('Error rendering the Contact Page:', error);
    res.status(500).render('503');
  }
});






module.exports = router;

