const {Schema, model} = require('mongoose');

const PostSchema = new Schema({
    id: String,
    likes: Array,
    comments: Array,
    path: String,
    author: Schema.Types.ObjectId,
    date: Date
}, {collection: 'posts'});

module.exports = model('Post', PostSchema);