/**
 * Node Modules.
 */
const { Router } = require("express");

/**
 * Route Middlewares.
 */
const protect = require("../../middlewares/auth/protect.js");
const { cloudinaryUpload } = require("../../middlewares/upload/cloudinary.js");

/**
 * Controllers
 */
const {
    create,
    getAllContributions
} = require("../../controllers/contribution/contribution.controller.js");


// Declare router.
const ContributionRouter = Router();

/**
 * Routes
 */
// Get all contribution
ContributionRouter.route("/contributions")
    .get(getAllContributions);

// Create a new contribution
ContributionRouter.route("/contribution/create")
    .get(protect, (req, res)=>{
        return res.render("contribution/create");
    })
    .post(protect, cloudinaryUpload.single("banner"), create)




module.exports = ContributionRouter;