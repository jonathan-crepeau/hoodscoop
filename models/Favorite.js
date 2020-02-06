const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    eventName: String,
    eventId: String,
    distance: Number,
    genre: String,
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
