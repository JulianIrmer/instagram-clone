const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    uid: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    isLoggedIn: {type: Boolean, required: true, unique: false},
    salt: {type: String, required: false},
    likes: {type: Array}
}, {collection: 'users'});

module.exports = model('User', UserSchema);