const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Base Route ----> "http://localhost:4000/api/favorites"

// View favorites
router.get('/api/favorites', ctrl.favorite.index);

// POST Favorite API Route
router.post('/api/favorites/:id', ctrl.favorite.addFav);

// DELETE Favorite Single User
router.delete('/api/favorites/:id', ctrl.favorite.destroy);

module.export = router;
