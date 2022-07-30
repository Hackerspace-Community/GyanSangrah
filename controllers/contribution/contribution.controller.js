/**
 * Node modules.
 */
const validator = require("validator");

/**
 * Utils
 */
const catchAsync = require("../../utils/catchAsync.js");

/**
 * Models.
 */
const Contribution = require('../../models/contribution.model.js');

/**
 * @description - Create a new contribution.
 */
module.exports.create = catchAsync(async (req, res) => {
    const user = req.user;

    const {
        title,
        content,
        category,
    } = req.body;

    if(!title || !content || !category) {
        req.flash('error', 'Please fill in all fields');
        return res.redirect('/contribution/create');
    }

    // Validate title length
    if(!validator.isLength(title, {min: 5, max: 100})) {
        req.flash('error', 'Title must be between 5 and 100 characters');
        return res.redirect('/contribution/create');
    }

    // Validate content length
    if(!validator.isLength(content, {min: 10, max: 500000})) {
        req.flash('error', 'Content must be between 10 and 500000 characters');
        return res.redirect('/contribution/create');
    }

    // Create contribution
    const contribution = new Contribution({
        title,
        content,
        category,
        user: user._id,
    });

    // Add banner image if it exists
    if(req.file) {
        const {
            path,
            filename
        } = req.file;

        const banner = {
            path,
            filename
        };

        contribution.banner = banner;
    }

    // Relate contribution to user
    user.contributions.push(contribution._id);

    // Save user and contribution
    await Promise.all([
        user.save(),
        contribution.save()
    ]);

    req.flash('success', 'Contribution created successfully');
    return res.redirect('/user/profile');

});

/**
 * @description - Get all contributions.
 */
module.exports.getAllContributions = catchAsync(async (req, res) => {
    const contributions = await Contribution.find({});
    return res.render('contribution/contributions', {
        contributions,
    });
})