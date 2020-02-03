const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const db = require('./models');
const PORT = process.env.PORT || 4000;

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

app.get('/', (request, response) => {
    response.sendFile(
      __dirname + '/views/login.html'
    )
})

app.get('/profile', (req, res) => {
  res.sendFile(
    __dirname + '/views/profile.html'
  )
})

app.get('/signup', (req, res) => {
  res.sendFile(
    __dirname + '/views/signup.html'
  )
})

app.get('/settings', (req, res) => {
  res.sendFile(
    __dirname + '/views/settings.html'
  )
})


// API ROUTES ============================= //

// GET Index Users Route

app.get('/api/users', (request, response) => {
  db.User.find({}, (error, allUsers) => {
    if (error) return response.status(500).json({message: 'Something went wrong here. Try again'});
    response.status(200).json(allUsers);
  });
});

app.post('/api/test', (req, res) => {
  res.json({status: 200, message: 'Test Success'})
});

// POST Signup (Create) Single User

app.post('/api/submitForm', async (req, res) => {
  const userData = req.body;
  let hash;

  try {
    hash = await bcrypt.hashSync(req.body.password, 10);
    userData.password = hash;
  } catch (err) {
    res.status(400).json({status: 400, error: 'Bad Request!'});
  }

     console.log("in submit form")

     db.User.create(req.body, (err, savedUser) => {
       if (err) {
        return res.json({lol})
       }
       console.log(`saved new user: ${savedUser}`)
       res.json({savedUser});
     });
  });

// POST Login API Route

app.post('/api/login', (req, res) => {
  const { firstName, lastName, email, password} = req.body;

  db.User.findOne({email}, async (err, foundUser) => {
    let passwordsMatch;
    if (err) res.status(400).json({status: 540, error: 'Bad request(A)'});

    if(!foundUser) {
      return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});
    }

    try {
      passwordsMatch = await bcrypt.compare(password, foundUser.password);
      console.log(passwordsMatch);
    } catch (err) {
      res.status(400).json({status: 400, message: 'Bad request(B).'});
    }

    req.session.currentUser = foundUser._id;
    req.session.createdAt = new Date().toDateString();
    req.session.user = foundUser;

    console.log(req.session);



    if (passwordsMatch) {
      res.status(200).json({status: 200, message: 'Success!'});
      console.log(req.session.user)
    } else {
      res.status(400).json({status: 400, error: 'Invalid credentials.'});
    }

  });
});


// GET Verify Single User

app.get('/api/verify', (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({status: 401, error: 'Unauthorized, please login and try again.'})
  }
  res.status(200).json(req.session.user);
});


// DELETE Logout Single User
app.delete('/api/logout', (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({status: 401, message: 'Unauthorized plese login and try again.'});
  }

  req.session.destroy((err) => {
    if (err) return res.status(400).json({err});
    res.status(200).json({status: 200}).redirect('/')
  })
})


// DELETE Destroy Single User

app.delete('/api/login', (req, res) => {
  db.User.findOneAndDelete({email: req.body.email}, (err, deletedUser) => {

    console.log(deletedUser)
    if (err) res.status(400).json({status: 400, error: 'Bad request, please try again.'});
    const responseObj = {
      status: 200,
      data: deletedUser,
      requestedAt: new Date().toLocaleString()
    };

    res.status(200).json(responseObj);

  });
});

// START SERVER ============================= //
app.listen(PORT, () => {
    console.log(`This server runs on http://localhost:${PORT}`);
});
