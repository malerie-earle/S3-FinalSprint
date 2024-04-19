const express = require('express');
const router = express.Router();
const { logger, logLogin, logLogout } = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const passport = require('passport');
const { search, searchResults } = require('../services/searchLogic.js');
const isAuthenticated = require('../middleware/authMiddleware.js');
const { generateNewCustomerId, getAllCustomers, getCustomerAccountByCustomerId, getCustomerAddressByCustomerId, getCustomerByCustomerId, getCustomerByEmail, getCustomerByPhoneNum, getCustomerByUsername, getCustomersByFirstName, getCustomersByGender, getCustomersByLastName, getCustomersByPayMethod, editCustomer, editCustomerAccount, editCustomerAddress, deleteCustomer, signUpUser, authenticateUser, addCustomer, addCustomerAccount, addCustomerAddress } = require('../services/pg.customers.dal.js');
const { log } = require('winston');



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



// Display the form for adding a customer
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


module.exports = router;