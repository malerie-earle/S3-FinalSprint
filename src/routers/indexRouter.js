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
          res.redirect('/'); 
        }
      });
    } else {
      logger.info('Username or password is incorrect. Redirecting to Login Page.');
      res.render('login', { error: 'Incorrect username or password.' }); 
    }
  } catch (error) {
    logger.error('Error in login:', error);
    res.render('login', { error: 'An error occurred during login.' });
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

module.exports = router;