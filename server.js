// Imports
const express = require('express');
const logger = require('./logEvents');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


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
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  // res.send('hello world!');
  res.render('index');
});

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
