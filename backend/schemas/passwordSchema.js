const { model, Schema } = require('mongoose');

const PasswordSchema = new Schema({
    password: {type: String, required: true, unique: true},
    uid: {type: String, required: true, unique: true}
}, {collection: 'passwords'});

module.exports = model('Password', PasswordSchema);