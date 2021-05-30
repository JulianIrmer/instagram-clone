const express = require('express');
const router = express.Router();
const multer = require('multer');
const PostSchema = require('../schemas/postSchema');
const UserSchema = require('../schemas/userSchema');
const CommentSchema = require('../schemas/commentSchema');
const uuid = require('uuid');
const path = require('path');
const { hasUserAlreadyLiked } = require('../heplers/contentHelper');
const { isInLikeArray } = require('../heplers/userHelper');

//multer options
const upload = multer({
    dest: path.resolve(__dirname + '../../uploads/images'),
    limits: {
        // fileSize: 1000000,
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true);
    }
});


router.get('/posts/get', async (req, res) => {
    const images = await PostSchema.find({});
    res.json({images});
});

router.post('/posts/add', upload.single('image'), async (req, res) => {
    try {
        const data = {
            path: path.join(__dirname, `../uploads/images/${req.file.filename}`), 
            id: req.file.filename,
            likes: [],
            comments: []
        }
        const post = new PostSchema(data);

        post.save((err, doc) => { 
            if (err) {
                res.json({success: false, error: err});
            } else {
                res.json({success: true});
            }
        });
    } catch (err) {
        throw err;
    }
});

router.post('/posts/like', async (req, res) => {
    const {id} = req.body;
    const post = await PostSchema.findOne({id: id});
    const username = req.session.username || 'holly';
    const user = await UserSchema.findOne({username: username});
    if (!user) {
        res.redirect('/home');
    }
    const hasUserAlreadyLikedResult = hasUserAlreadyLiked(user._id, post.likes);
    const isInUsersLikes = isInLikeArray(post._id, user.likes);

    if (hasUserAlreadyLikedResult.hasLiked) {
        post.likes.splice(hasUserAlreadyLikedResult.index, 1);
    } else {
        post.likes.push(user._id);
    }

    if (isInUsersLikes.hasLiked) {
        user.likes.splice(isInUsersLikes.index, 1);
    } else {
        user.likes.push(post._id);
    }

    post.markModified('likes');
    post.save((err) => {
        if (err) {
            console.log(err);
        }
    });

    user.markModified('likes');
    user.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json({success: true});
});

router.post('/posts/delete', async (req, res) => {
    PostSchema.findOneAndDelete({id: req.body.id}, (err, doc) => {
        if (err) {
            res.json({succes: false, error: err});
        } else {
            res.json({success: true});
        }
    });
});

router.post('/comment/add', async (req, res) => {
    const post = await PostSchema.findOne({id: req.body.id});
    const user = await UserSchema.findOne({username: req.session.username});
    const comment = new CommentSchema({content: req.body.content, user: user._id, id: uuid.v3()});
    comment.save();
    post.comments.push(comment._id);
    post.markModified('comments');
    post.save();
    res.json({success: true});
});

router.get('/comment/delete', async (req, res) => {
    const post = await PostSchema.findOne({id: req.body.postID});
    const comment = await CommentSchema.findOneAndDelete({id: req.body.commentID}, (err) => {
        if (err) res.json({success: false, error: err});
    });

    for (let i = 0; i < post.comments.length; i++) {
        if (post.comments.id === comment.id) {
            posts.comments.splice(i, 1);
            post.markModified('comments');
            post.save();
        }
    }
});

module.exports = router;