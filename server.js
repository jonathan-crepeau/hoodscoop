const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const db = require('./models');
const PORT = process.env.PORT || 4000;
const routes = require('./routes');

// MIDDLEWARE ============================= //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Express Session
app.use(session({
  store: new MongoStore({
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
app.use('/api', routes.user);

// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
