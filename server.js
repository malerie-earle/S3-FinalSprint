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


const pool = require('./src/services/pg.auth_db');
const router = require('./src/routes/customerRouter');

// App setup
const app = express();
const PORT = process.env.PORT || 5051; 

// Configure session middleware
app.use(session({
  secret: 'Z90yLqzmjVAWJ8xC5Sj3EWGjFnpvE1KVmLAoepdk0UM=',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(flash()); // Add connect-flash middleware here
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('public'));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/', router);

// Passport Configuration
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await authenticateUser(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Routes for login and registration pages
app.get('/login', (req, res) => {
  res.render('login', { messages: req.flash('error') });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/registration', (req, res) => {
  res.render('registration', { messages: req.flash('error') });
});

// Home page route
app.get('/home', (req, res) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    res.render('index', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

// Error handling
app.use((req, res) => {
  res.status(404).render('404');
});

app.use((req, res) => {
  res.status(500).render('503');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
