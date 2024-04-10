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
  secret: 'Z90yLqzmjVAWJ8xC5Sj3EWGjFnpvE1KVmLAoepdk0UM=',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport middleware *Change dummy data when connected to db*
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    // Dummy user data (replace with actual database queries)
    const dummyUser = { id: 1, username: 'user', password: '$2b$10$VMMdP/7UetE/xkOQ77XeP.gdo4wQtwex2QteD.v.u1SxlYsdn7T8S' }; // Password: "password"
    
    // Check if username exists
    if (username !== dummyUser.username) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    
    // Check if password is correct
    bcrypt.compare(password, dummyUser.password, (err, result) => {
      if (err) return done(err);
      if (!result) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, dummyUser);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Dummy user data (replace with actual database queries)
  const dummyUser = { id: 1, username: 'user' }; // Assume user is already authenticated
  done(null, dummyUser);
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('public'));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Routes
app.use('/', require('./src/routes/indexRouter'));
app.use('/customer/', require('./src/routes/customerRouter'));
app.use('/product/', require('./src/routes/productRouter'));
app.use('/recipe/', require('./src/routes/recipeRouter'));


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
