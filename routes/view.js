const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Login (Homepage) Route

router.get('/', (req, res) => {
    res.sendFile('/views/login.html', {
        root: `${__dirname}/../`
    });
});

// Profile (Map Page) Route

router.get('/profile', (req, res) => {
    res.sendFile('/views/profile.html', {
        root: `${__dirname}/../`
    });
});

// Signup Route

router.get('/signup', (req, res) => {
    res.sendFile('/views/signup.html', {
        root: `${__dirname}/../`
    });
});

// Settings Route

router.get('/settings', (req, res) => {
    res.sendFile('/views/settings.html', {
        root: `${__dirname}/../`
    });
});

module.exports = router;