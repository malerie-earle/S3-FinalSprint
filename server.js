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

const pool = require('./src/services/pg.auth_db');
const router = require('./src/routes/customerRouter');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});

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

passport.use(new LocalStrategy((username, password, done) => {
  pool.query('SELECT * FROM customer_account WHERE username = $1', [username], (err, result) => {
    if (err) {
      return done(err);
    }
    const customer = result.rows[0];
    if (!customer) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, customer.password, (err, isValid) => {
      if (err) {
        return done(err);
      }
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, customer);
    });
  });
}));


passport.serializeUser((user, done) => {
  done(null, user.customer_id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM customer_account WHERE customer_id = $1', [id], (err, result) => {
    if (err) {
      return done(err);
    }
    const customer = result.rows[0];
    done(null, customer);
  });
});


// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('public'));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Routes
app.use('/', require('./src/routes/customerRouter'));

// Routes for login and registration pages
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/registration', (req, res) => {
  res.render('registration');
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
