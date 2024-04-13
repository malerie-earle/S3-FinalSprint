const logger = require('../logEvents.js');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  
  // User is not authenticated, redirect to the login page
  logger.info('User is not authenticated. Redirecting to Login Page.');
  res.render('login');
}

module.exports = isAuthenticated;