/**
 * Model imports.
 */
const User = require("../../models/user.model.js");

/**
 * Utils.
 */
const { verifyToken } = require("../../utils/auth/jwt.js");

/**
 * @description - Gets the current user.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} user - The user object.
 * @return {undefined} - if no User is found.
 */
const currentUser = async (req, res) => {
    try {
        if(req.signedCookies && req.signedCookies.token){
            const token = req.signedCookies.token;
            const payload = await verifyToken(token, process.env.JWT_SECRET);
            const user = await User.findById(payload.id)
                .select("-password -tokens -__v");

            return user;
        } else {
            return undefined;
        }
    } catch(e){
        return undefined;
    }
}

module.exports = currentUser;