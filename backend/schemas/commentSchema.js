const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({
    id: String,
    user: Schema.Types.ObjectId,
    content: String
}, {collection: 'comments'});

module.exports = model('Comment', CommentSchema);