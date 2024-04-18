// Import the required modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { authenticateUser, getCustomerByCustomerId } = require('../services/pg.customers.dal.js');
const isAuthentic = require('./middleware/authMiddleware.js');
const { logger } = require('./logEvents.js');

// Initialize the user cache
const userCache = {}; 

// Configure the Local Strategy for use by Passport.
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      // Authenticate the user
      const user = await authenticateUser(username, password);
      // If the user is not found, return a message
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      // If the user is found, return the user
      return done(null, user);

    // If an error occurs, return the error
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize the user by their customer_id
passport.serializeUser((user, done) => {
  logger.info(`Serializing the user: ${user.customer_id}`);
  if (!user.customer_id) {
    return done(null, false, { message: 'User not found' });
  }
  done(null, user.customer_id); 
});

// Deserialize the user
passport.deserializeUser(async function(customer_id, done) {
  try {
    // Check if user details are in the cache
    if (userCache[customer_id]) {
      logger.info(`User details found in cache: ${customer_id}`);
      return done(null, userCache[customer_id]);
    }
    // Get the user details by their customer_id
    const user = await getCustomerByCustomerId(customer_id);
    // Cache the user details
    if (user) {
      userCache[customer_id] = user;
      return done(null, user);
    // If the user is not found, return a message
    } else {
      return done(null, false, { message: 'User not found' });
    }

  // If an error occurs, return the error
  } catch (error) { 
    return done(error);
  }
});

// Export the Passport configuration
module.exports = passport;

