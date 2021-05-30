const UserSchema = require('../schemas/userSchema');
const bcrypt = require('bcrypt');

module.exports.getUserStatus = async (email) => {
    try {
        const user = await UserSchema.findOne({email: email});

        if (user) {
            return user.isLoggedIn;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

module.exports.isInLikeArray = (postID, likes) => {
    try {
        const result = {
            index: null,
            hasLiked: false
        };

        if (likes.length < 1) return result;

        if (likes.includes(postID)) {
            result.index = likes.indexOf(postID);
            result.hasLiked = true;
        }

        return result;
    } catch (error) {
        throw error;
    }
};

module.exports.getUsernameAvailability = async (username) => {
    try {
        const users = await UserSchema.find({username: username});
        return users.length === 0;
    } catch (error) {
        throw error;
    }
};

module.exports.getEmailAvailability = async (email) => {
    try {
        const users = await UserSchema.find({email: email});
        return users.length === 0;
    } catch (error) {
        throw error;
    }
};

module.exports.hashPasswordAsync = async (password, userSalt) => {
    try {
        const salt = userSalt ? userSalt : await bcrypt.genSalt();
        const result = {
            password: await bcrypt.hash(password, salt),
            salt: salt
        };
    
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports.getLatestIndex = async () => {
    try {
        const userWithHighestID = await UserSchema.find({}).sort({uid : -1}).limit(1);
        return userWithHighestID.length > 0 ? userWithHighestID[0].uid + 1 : 1;
    } catch (error) {
        throw error;
    }
};

module.exports.getUserUpdateQuery = async (body) => {
    try {
        const schemaProperties = Object.keys(UserSchema.schema.paths)
        const requestKeys = Object.keys(body)
        const requestValues = Object.values(body)
        const updateQuery = {}
       
        for (let i = 0; i < requestKeys.length; i++) {
            if ( schemaProperties.includes(requestKeys[i]) && requestKeys[i] !== 'password'){
                updateQuery[requestKeys[i]] = requestValues[i];
            }
        }
        return updateQuery;
    } catch (error) {
        throw error;
    }
};

module.exports.getAuthenticationStatus = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/account/login');
    } else {
        next();
    }    
};