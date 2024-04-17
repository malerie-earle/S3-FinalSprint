// Import the required modules
const logger = require('../logEvents.js');

// Middleware to check if user is authenticated
function isAuthentic(req, res, next) {
  // Check if the user is authenticated
  if (req.isAuthentic()) {
    // User is authenticated, proceed to the next middleware or route handler
    return next(); 
  }
  
  // User is not authenticated, redirect to the login page
  logger.info('User is not authenticated. Redirecting to Login Page.');
  res.render('login');
}

// Export the isAuthenticated middleware
module.exports = isAuthentic;