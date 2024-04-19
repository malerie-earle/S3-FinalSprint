if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const passport = require('passport'); // Only import passport once

// Imports
const express = require('express');
const { logger } = require('./src/logEvents');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const { Pool } = require('pg');
const { authenticateUser } = require('./src/services/pg.customers.dal');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Bcrypt functions
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

const verifyPassword = async (password, hash) => {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};

// Database Connection & routers
const mPg = require('./src/services/pg.auth_db');
const mDal = require('./src/services/m.auth_db.js');
const indexRouter = require('./src/routers/indexRouter');
const customerRouter = require('./src/routers/customerRouter');
const vendorRouter = require('./src/routers/vendorRouter');
const productRouter = require('./src/routers/productRouter');
const recipeRouter = require('./src/routers/recipeRouter');

// App setup
const app = express();
const PORT = process.env.PORT || 5051; 

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // For development, set to true in production with HTTPS
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('public'));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Bcrypt middleware
app.use((req, res, next) => {
  req.hashPassword = hashPassword;
  req.verifyPassword = verifyPassword;
  next();
});

// Routers
app.use('/', indexRouter);
app.use('/customer/', customerRouter);
app.use('/product/', productRouter);
app.use('/recipe/', recipeRouter);
app.use('/vendor/', vendorRouter);
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
    process.exit(1); 
  }
})();

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).render('503');
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(404).render('404');
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
