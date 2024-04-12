const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { authenticateUser, getCustomerByCustomerId } = require('../services/pg.customers.dal.js');

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
    const user = await getCustomerByCustomerId(customer_id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


module.exports = 
    passport;

