/**
 * Node modules.
 */
const validator = require("validator");

/**
 * Middlewares
 */
const {
    cloudinary
} = require("../../middlewares/upload/cloudinary.js");

/**
 * Models
 */
const User = require("../../models/user.model.js")

/**
 * Utils.
 */
const catchAsync = require("../../utils/catchAsync.js");

/**
 * @description - Updates user profile.
 */
module.exports.updateUser = catchAsync(async (req, res) => {
    // 1. Getting the current user.
    let user;
    const { id } = req.params;
    id ? user = await User.findById(id) : user = req.user;

    // 2. Based on input from the edit from setting the fields to update.
    let query = { $set: {} };
    for (let key in req.body) {
        if (user[key] && user[key] !== req.body[key]) {
            query.$set[key] = req.body[key];
        }
    }

    // 3. If user has update profile pic then...
    if (req.file) {
        // 3.1. Delete the previous avatar from cloudinary before adding a new one
        // await cloudinary.uploader.destroy(req.file.filename)
        const prevAvatarFilename = req.user.avatar.filename;
        await cloudinary.uploader.destroy(prevAvatarFilename);
        // 3.2. Add the new avatar cloudinary path to the user object
        query.$set.avatar = {
            path: req.file.path,
            filename: req.file.filename
        }
    }

    // 4. If the email or phone number was updated then...
    if (query.$set.phoneNumber) {
        const { phoneNumber } = query.$set;
        // 4.1. Check if the email or phone number is already taken
        const existingUser = await User.findOne({ phoneNumber });

        if (existingUser) {
            req.flash('error', 'Make sure the new phone number is unique.');
            return res.redirect('/users/edit');
        }
    }

    // 5. Finally updating the user.
    await User.findByIdAndUpdate(user._id, query);

    id ? res.redirect(`/user/${id}`) : res.redirect('/user/profile');
});