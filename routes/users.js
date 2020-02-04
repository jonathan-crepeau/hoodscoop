const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Base route -----> (http://localhost:4000/api)

// CRUD ROUTES ================================= //

// POST Signup (Create) Single User
router.post('/submitForm', ctrl.auth.signup);

// Show (VIEW) Single User
router.get('/users/:id', ctrl.auth.show);

// PUT Update Single User
<<<<<<< HEAD
router.put('/update', ctrl.auth.update); 
=======
// router.put('/users/:id', ctrl.auth.update); 
>>>>>>> submaster

// DELETE Destroy Single User
router.delete('/delete', ctrl.auth.destroy);



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
