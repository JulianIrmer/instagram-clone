const express = require('express');
const PostSchema = require('../schemas/postSchema');
const UserSchema = require('../schemas/userSchema');
const router = express.Router();

router.get('/', async (req, res) => {
    const username = req.session.username;
    console.log(req.session.username);
    if (!username) {

        res.json({isAuthorized: false, location: 'login'});
        return;
    }

    const user = await UserSchema.findOne({username: username});
    const subscriptionIDs = user.subscriptions;
    let posts = [];

    for (let subID of subscriptionIDs) {
        const post = await PostSchema.find({author: subID});
        const author = await UserSchema.findOne({username: subID});
        // const avatar = author.avatar;
        data = {
            // avatar,
            post
        }
        posts.push(data);
    }

    posts = posts.flat();
    posts.reverse();
    console.log('username', username);
    const result = {
        posts: posts,
        isAuthorized: username.length > 0
    }
    res.send(result);
});

router.get('/login', () => {
    res.json({location: 'login'});
});

module.exports = router;