module.exports.hasUserAlreadyLiked = (userID, likes) => {
    try {
        const result = {
            index: null,
            hasLiked: false
        };

        if (likes.length < 1) return result;

        if (likes.includes(userID)) {
            result.index = likes.indexOf(userID);
            result.hasLiked = true;
        }

        return result;
    } catch (error) {
        throw error;
    }
};