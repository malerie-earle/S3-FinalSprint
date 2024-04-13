const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { authenticateUser, getCustomerByCustomerId } = require('../services/pg.customers.dal.js');


const userCache = {}; // Initialize the cache



passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await authenticateUser(username, password);

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }


     
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.customer_id); // Serialize the user by their customer_id
});

passport.deserializeUser(async function(customer_id, done) {
  try {
    // Check if user details are in the cache
    if (userCache[customer_id]) {
      return done(null, userCache[customer_id]);
    }

    const user = await getCustomerByCustomerId(customer_id);

    // Cache the user details
    if (user) {
      userCache[customer_id] = user;
      return done(null, user);  // Return user details
    } else {
      return done(null, false, { message: 'User not found' });
    }
  } catch (error) { 
    return done(error);
  }
});


module.exports = passport;

