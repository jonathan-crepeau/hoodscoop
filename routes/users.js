const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Base route -----> (http://localhost:4000/api)

// CRUD ROUTES ================================= //

// POST Signup (Create) Single User
router.post('/submitForm', ctrl.auth.signup);

// TODO - Read (view) a single user

// PUT Update Single User
// router.put('/users/:id', ctrl.auth.update); 

// DELETE Destroy Single User
router.delete('/api/login', ctrl.auth.destroy);



// ALL OTHER ROUTES ================================= //

// GET Index Users Route
router.get('/users', ctrl.auth.index);

// POST Login API Route
router.post('/login', ctrl.auth.login);

// GET Verify Single User
router.get('/verify', ctrl.auth.verify);

// DELETE Logout Single User
router.delete('/logout', ctrl.auth.logout);



module.exports = router;