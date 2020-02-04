const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Base route -----> (http://localhost:4000/api)

// GET Index Users Route 
router.get('/users', ctrl.auth.index);

// POST Signup (Create) Single User
router.post('/submitForm', ctrl.auth.signup);

// POST Login API Route
router.post('/login', ctrl.auth.login);

// GET Verify Single User
router.get('/verify', ctrl.auth.verify);

// DELETE Logout Single User
router.delete('/logout', ctrl.auth.logout);

// DELETE Destroy Single User
router.delete('/api/login', ctrl.auth.destroy);

// USER APIS ================================================== //
// Base route -----> (http://localhost:4000/api)

module.exports = router;