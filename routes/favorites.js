const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Base Route ----> "http://localhost:4000/api"

// View favorites
router.get('/favorites', ctrl.favorite.index);

// POST Favorite API Route
router.post('/favorites/:id', ctrl.favorite.addFav);

// DELETE Favorite Single User
router.delete('/favorites/:id', ctrl.favorite.destroy);

module.exports = router;
