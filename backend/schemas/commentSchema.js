const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({
    user: Schema.Types.ObjectId,
    content: String
}, {collection: 'comments'});

module.exports = model('Comment', CommentSchema);