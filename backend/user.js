const UserSchema = require('../schemas/userSchema');
const PasswordSchema = require('../schemas/passwordSchema');
const express = require('express');
const router = express.Router();
const {
        getUsernameAvailability,
        getEmailAvailability,
        hashPasswordAsync, 
        getLatestIndex,
        getUserUpdateQuery
    } = require('../heplers/userHelper');

router.get('/login', (req, res) => {
    try {
        const isLoggedIn = req.session.email ? true : false;
        if (isLoggedIn) {
            res.redirect('/home');
        }
    } catch (error) {
        throw error;
    }
});

router.post('/login', async (req, res) => {
    try {
        const username = req.body.username + '';
        const password = req.body.password + '';
        const user = await UserSchema.findOne({username: username});
        const passwordObject = await hashPasswordAsync(password, user.salt);
    
        if (!user.isLoggedIn) {
            PasswordSchema.findOne({password: passwordObject.password, uid: user._id}, (err, doc) => {
                if (err) {
                    res.json({success: false, message: err});
                }
                else if (!doc) {
                    res.json({success: false, message: 'Password wrong.'});
                } else {
                    user.isLoggedIn = true;
                    user.save();
                    req.session.email = user.email;
                    res.redirect('/home');
                }
            });
        } else {
            res.json({success: true});
        }
    } catch (error) {
        throw error;
    }
});

router.get('/register', (req, res) => {
    res.send('register page');
});

router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const isUsernameAvailable = await getUsernameAvailability(body.username);
        const isEmailAvailable = await getEmailAvailability(body.email);
        
        if (isUsernameAvailable && isEmailAvailable) {
            const user = new UserSchema(body);
            user.isLoggedIn = true;
            user.uid = await getLatestIndex();
            req.session.email = user.email;
            
            const passwordObject = await hashPasswordAsync(user.password, null);
            const pwSchema = new PasswordSchema({uid: user._id, password: passwordObject.password});
            pwSchema.save();
            user.password = pwSchema._id; 
            user.salt = passwordObject.salt;
        
            user.save((err) => {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.redirect('/home');
                }
              });
        } else {
            res.json({success: false, message: 'Email or username already in use'});
        }
    } catch (error) {
        res.json(error);
        throw error;
    }
});

router.get('/logout', (req, res) => {

});

router.post('/logout', (req, res) => {
    try {
        const username = req.session.username;
    
        UserSchema.updateOne({username: username}, {isLoggedIn: false}, {new: false}, (err, doc) => {
            if (err) {
                res.json({success: false, message: err});
            } else {
                res.session.destroy();
                res.redirect('/home');
            }
        });
    } catch (error) {
        throw error;
    }
});

router.get('/delete', (req, res) => {
    res.send('delete user');
});

router.post('/delete', async (req, res) => {
    try {
        const username = req.session.username || req.body.username;
        const user = await UserSchema.deleteOne({username: username});

        if (user) {
            const password = await PasswordSchema.deleteOne({uid: user._id});
            if (password) {
                res.redirect('/home');
            } else {
                res.json({success: false});
            }
        } else {
            res.json({success: false, message: 'No account found'});
        }
    } catch (error) {
        throw error;
    }
});

router.get('/update', (req, res) => {
    res.send('update user');
});
router.post('/update', async (req, res) => {
    try {
        const body = req.body;
        const isEmailAvailable = await getEmailAvailability(body.email);

        if (isEmailAvailable) {
            const updateQuery = await getUserUpdateQuery(body);

            UserSchema.updateOne(
                { username: body.username},
                { $set: updateQuery },
                { new: false },
                (err, doc) => {
                    if (err) {
                        res.json({success: false, message: err});
                    } else if (!doc) {
                        res.json({success: false, message: 'No User found'});
                    } else {
                        res.json({success: true});
                    }
                }
            );
        } else {
            res.json({success: false, message: 'Email or username already in use'});
        }
    } catch (error) {
        throw error;
    }
});

module.exports = router;