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
 const { newToken } = require("../../utils/auth/jwt.js");






 module.exports.allContributorRequest = catchAsync(async (req, res) => {
    const model = req.model;

    const users = await User.find()

    if(!users) {
        req.flash("error", "No Users found");
        return res.redirect("/");
    }
    
    res.render("admin/contributorManagement", {
        users,
    });
});




module.exports.ContributorRequestApprove = catchAsync(async (req, res) => {
  
    const {
        id
    } = req.params;
    console.log(id);


    User.findByIdAndUpdate(id, { role: 'ROLE_CONTRIBUTOR' },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        return res.redirect("/admin/contributorManagement");
    }
});


 
    
 
});





module.exports.ContributorRequestDelete = catchAsync(async (req, res) => {
  
    const {
        id
    } = req.params;
    console.log(id);

    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err)
        } else {
            return res.redirect("/admin/contributorManagement");
        }
     });
    
 
});






module.exports.allCategory = catchAsync(async (req, res) => {
    const category = await Category.find()

    if(!category) {
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

    if(!title) {
        req.flash("error", "Please fill in all fields");
        return res.redirect("/admin/category");
    }
    
    const category = new Category({
        title, status:"ACTIVE",
    });
    await category.save();
    return res.redirect("/admin/category");




});
module.exports.categoryDelete = catchAsync(async (req, res) => {

    const {
        id
    } = req.params;
    console.log(id);

    Category.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err)
        } else {
            return res.redirect("/admin/category");
        }
     });


});
module.exports.categoryUpdate = catchAsync(async (req, res) => {
});