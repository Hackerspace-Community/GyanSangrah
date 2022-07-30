/**
 * Node modules.
 */
const validator = require("validator");

/**
 * Model imports.
 */
const User = require("../../models/user.model.js");
const Category = require("../../models/admin.category.model.js");


/**
 * Utils.
 */
const catchAsync = require("../../utils/catchAsync.js");


/**
 * @description - Get all contributors request.
 */
module.exports.allContributorRequest = catchAsync(async (req, res) => {
    // Find all users who requested to become a contributor
    const users = await User.find({
        contributorStatus: "pending"
    })

    if (!users) {
        req.flash("error", "No Users found");
        return res.redirect("/");
    }

    res.render("admin/contributorManagement", {
        users,
    });
});


module.exports.contributorRequestApprove = catchAsync(async (req, res) => {

    const {
        id
    } = req.params;
    console.log(id);


    User.findByIdAndUpdate(id, { role: 'ROLE_CONTRIBUTOR' },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                return res.redirect("/admin/contributorManagement");
            }
        });





});




/**
 * @description - Delete user profile.
 */
module.exports.contributorRequestDelete = catchAsync(async (req, res) => {

    const {
        id
    } = req.params;

    await User.findByIdAndRemove(id);

    req.flash("success", "User deleted successfully");
    return res.redirect("/admin/contributorManagement");
});






module.exports.addCategory = catchAsync(async (req, res) => {
    const category = await Category.find()

    if (!category) {
        req.flash("error", "No Users found");
        return res.redirect("/");
    }

    res.render("admin/category", {
        category,
    });
});

module.exports.categoryAdd = catchAsync(async (req, res) => {
    const {
        title
    } = req.body;

    if (!title) {
        req.flash("error", "Please fill in all fields");
        return res.redirect("/admin/category");
    }

    const category = new Category({
        title, status: "ACTIVE",
    });
    await category.save();
    return res.redirect("/admin/category");

});

module.exports.categoryDelete = catchAsync(async (req, res) => {

    const {
        id
    } = req.params;
    console.log(id);

    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err)
        } else {
            return res.redirect("/admin/category");
        }
    });


});
module.exports.categoryUpdate = catchAsync(async (req, res) => {
});