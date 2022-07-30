/**
 * Node modules.
 */
const validator = require("validator");

/**
 * Model imports.
 */
const User = require("../../models/user.model.js");


/**
 * Utils.
 */
const catchAsync = require("../../utils/catchAsync.js");
const { newToken } = require("../../utils/auth/jwt.js");

/**
 * @description - Registers a new user.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} res - Redirects to the ... 
 */
module.exports.register = catchAsync(async (req, res)=>{
    const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
    } = req.body;

    if(!firstName || !lastName || !email || !password || !phoneNumber) {
        req.flash("error", "Please fill in all fields");
        return res.redirect("/user/register");
    }

    if(!validator.isAlpha(firstName) || !validator.isAlpha(lastName)){
        req.flash("error", "First and last name must be alphabetical");
        return res.redirect("/user/register");
    }

    if(!validator.isEmail(email)){
        req.flash("error", "Please enter a valid email");
        return res.redirect("/user/register");
    }

    if(!validator.isLength(password, {min: 6})){
        req.flash("error", "Password must be at least 6 characters");
        return res.redirect("/user/register");
    }

    if(!validator.isMobilePhone(phoneNumber, "en-IN")){
        req.flash("error", "Please enter a valid phone number");
        return res.redirect("/user/register");
    }

    // Check if user already exists based on its phone or email.
    const existingUser = await User.findOne({
        $or: [
            {
                email
            },
            {
                phoneNumber
            }
        ]
    });

    if(existingUser){
        req.flash("error", "An account already exists with that email or phone number");
        return res.redirect("/user/register");
    }

    const user = new User({
        firstName,
        lastName,
        email,        
        password,
        phoneNumber
    });

    const token = newToken(user._id);

    user.tokens.push({ token });
    await user.save();

    res.cookie("token", token, { signed: true });
    req.flash("success", "You have successfully registered");

    return res.redirect("/");
});

/**
 * @description - Logs in a user.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} res - Redirects to the ...
 */
module.exports.login = catchAsync(async (req, res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        req.flash("error", "Please fill in all fields");
        return res.redirect("/user/login");
    }

    const user = await User.findOne({ email });

    if(!user){
        req.flash("error", "Invalid email or password");
        return res.redirect("/user/login");
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        req.flash("error", "Invalid email or password");
        return res.redirect("/user/login");
    }

    const token = newToken(user._id);
    user.tokens.push({ token });

    await user.save();

    res.cookie("token", token, { signed: true });
    req.flash("success", "You have successfully logged in");

    return res.redirect("/");
});

/**
 * @description - Logs out a user.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} res - Redirects to the ...
 */
module.exports.logout = catchAsync(async (req, res)=>{
    res.clearCookie("token");
    console.log(req.user);
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    req.flash("success", "You have successfully logged out");
    return res.redirect("/");
})

/**
 * @description - Logout from all devices.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} res - Redirects to the ...
 */
module.exports.logoutAll = catchAsync(async (req, res)=>{
    res.clearCookie("token");
    req.user.tokens = [];
    await req.user.save();
    req.flash("success", "You have successfully logged out from all devices");
    return res.redirect("/");
});