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
const { Pool } = require('pg');
const { authenticateUser } = require('./src/services/pg.customers.dal');
const bodyParser = require('body-parser');
const flash = require('connect-flash');


// Database Connection & routers
const mPg = require('./src/services/pg.auth_db');
const mDal = require('./src/services/m.auth_db.js');
const customerRouter = require('./src/routers/customerRouter');
const productRouter = require('./src/routers/productRouter');
const indexRouter = require('./src/routers/indexRouter');
const recipeRouter = require('./src/routers/recipeRouter');
const vendorRouter = require('./src/routers/vendorRouter');

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
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());


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
  console.log(`Server is running on port ${PORT}`);
});
