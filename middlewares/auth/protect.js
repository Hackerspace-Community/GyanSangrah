/**
 * Model.
 */
const User = require("../../models/user.model.js");

/**
 * Utils.
 */
const { verifyToken } = require("../../utils/auth/jwt.js");
const catchAsync = require("../../utils/catchAsync.js");

/**
 * @description - Middleware to check if the user is authenticated.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next function.
 * 
 * @returns {object} - res redirects to login(/user/login) if not authenticated.
 * @returns {object} - res redirects to protected route after auth.
 */
const protect = catchAsync(async (req, res, next)=>{
    let jwtToken;

    if(req.signedCookies && req.signedCookies.token){
        try {
            jwtToken = req.signedCookies.token;
            const payload = await verifyToken(jwtToken);
           
            req.user = await User.findById({
                _id: payload.id,
                "tokens.token": jwtToken,
            }).select("-password -__v");
            if(!req.user) return res.redirect("/user/login");
            req.token = jwtToken;
            next();
        } catch (e) {
            console.error(e);
            req.flash("error", "Session expired login again");
            return res.redirect("/user/login");
        }
    }
    if(!jwtToken){
        req.flash("error", "You must be logged in to do that");
        return res.redirect("/user/login");
    }
});

module.exports = protect;