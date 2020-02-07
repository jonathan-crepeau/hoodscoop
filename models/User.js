const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        //(match:) see regex line from Jonathan + John's collabothon. Otherwise if it accepts non-email format it'll potentially break server later on.
    },
    password: {
        type: String,
        minlength: [4, 'Password must be at least 4 characters long.'],
        required: true,
        unique: true,
    },
    favorites: [{
        type: Schema.Types.ObjectId,  //REFERENCING :D
        ref: 'Favorite'
    }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
