// Import the required modules
const { logger } = require('../logEvents.js');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware or route handler
    return next(); 
  }
  
  // User is not authenticated, redirect to the login page
  logger.info('User is not authenticated. Redirecting to Login Page.');
  res.render('login');
}

// Export the isAuthenticated middleware
module.exports = isAuthenticated;