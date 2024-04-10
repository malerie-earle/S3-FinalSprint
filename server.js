if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Imports
const express = require('express');
const logger = require('./src/logEvents');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();
const flash = require('connect-flash');
const { authenticateUser } = require('./src/services/pg.customers.dal');


// Database Connection & routers
const pool = require('./src/services/pg.auth_db');
const customerRouter = require('./src/routes/customerRouter');
const productRouter = require('./src/routes/productRouter');
const indexRouter = require('./src/routes/indexRouter');
const recipeRouter = require('./src/routes/recipeRouter');

// App setup
const app = express();
const PORT = process.env.PORT || 5051; 

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// // Serialize and Deserialize User
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   // Replace 'User' with your user model
//   User.findById(id, (err, []) => {
//     done(err, user);
//   });
// });

// Middleware
app.use(flash()); // Add connect-flash middleware here
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('public'));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Passport Configuration
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await authenticateUser(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

  } catch (error) {
    return done(error);
  }
}));

// Routers
app.use('/', require('./src/routes/indexRouter'));
app.use('/customer/', require('./src/routes/customerRouter'));
app.use('/product/', require('./src/routes/productRouter'));
app.use('/recipe/', require('./src/routes/recipeRouter'));





// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).render('503');
});

app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
