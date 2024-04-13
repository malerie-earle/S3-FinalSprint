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

const bodyParser = require('body-parser');

// Database Connection & routers
const mPg = require('./src/services/pg.auth_db');
const mDal = require('./src/services/m.auth_db.js');
const customerRouter = require('./src/routers/customerRouter');
const productRouter = require('./src/routers/productRouter');
const indexRouter = require('./src/routers/indexRouter');
const recipeRouter = require('./src/routers/recipeRouter');

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


passport.serializeUser((user, done) => {
  if (!user) {
    return done(new Error('No user found'), null);
  }
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err, null);
    }
    if (!user) {
      return done(new Error('No user found'), null);
    }
    done(null, user);
  });
});

// Middleware
app.use(flash()); // Add connect-flash middleware here
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('public'));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());

// Passport Configuration
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await authenticateUser(username);
    if (!user) {
      return done(null, false);
    }

  } catch (error) {
    return done(error);
  }
}));

// Routers
app.use('/', require('./src/routers/indexRouter'));
app.use('/customer/', require('./src/routers/customerRouter'));
app.use('/product/', require('./src/routers/productRouter'));
app.use('/recipe/', require('./src/routers/recipeRouter'));
app.use('/vendor/', require('./src/routers/vendorRouter'));
app.use('/', require('./src/routers/searchRouter'));


// Connect to the database
(async () => {
  try {
    await mDal.connect();
    logger.info('Connected to the MongoDB Database!');
    await mPg.connect();
    logger.info('Connected to the PostgreSQL Database!');
  } catch (error) {
    logger.error('Error connecting to the database', error);
    res.status(500).render('503');
  }
})();
app.use('/', require('./src/routes/indexRouter'));
app.use('/customer/', require('./src/routes/customerRouter'));
app.use('/product/', require('./src/routes/productRouter'));
app.use('/recipe/', require('./src/routes/recipeRouter'));
app.use('/vendor/', require('./src/routes/vendorRouter'));


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
