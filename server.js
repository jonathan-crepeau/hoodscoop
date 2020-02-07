// NOTE - remove unused
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Internal Require
const db = require('./models');
const routes = require('./routes');
const app = express();

// Config Var usually last, but sometimes ahead if needed for 'requires'
const PORT = process.env.PORT || 4000;

// MIDDLEWARE ============================= //
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// put this at the top of the actual 'views.js' file in Routes folder -- those are the only routes that need it, otherwise servers every one public
app.use(express.static(__dirname + '/public'));

// Express Session
app.use(session({
  store: new MongoStore({
    // include process.env.MONGODB_URI (like index should be)
    url: 'mongodb://localhost:27017/user-info',
  }),
  secret: process.env.SESSION_SECRET || "jdugifjk24u994u8tk32ngi3u",
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
  },
}));

// HTML ROUTES ============================= //
app.use('/', routes.view);


// API ROUTES ============================= //
// api/v1/users/thenwhatever vs. api/v1/favorites/thenwhatever
// then it'd be (app.use('/users', routes.user) + (app.use('/favorites', routes.user)
app.use('/api', routes.user);
app.use('/api', routes.favorite);

// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
