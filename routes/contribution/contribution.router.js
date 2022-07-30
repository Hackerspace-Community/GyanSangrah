/**
 * Node Modules.
 */
const { Router } = require("express");

/**
 * Route Middlewares.
 */
const protect = require("../../middlewares/auth/protect.js");
const role = require("../../middlewares/auth/role.js");
const { cloudinaryUpload } = require("../../middlewares/upload/cloudinary.js");

/**
 * Models.
 */
const Category = require("../../models/admin.category.model.js")

/**
 * Controllers
 */
const {
    create,
    getAllContributions,
    getOneContribution
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
    .get(protect, role.checkRole(role.ROLES.CONTRIBUTOR), async (req, res)=>{
        // Get all categories
        const categories = await Category.find({});

        return res.render("contribution/create", {
            categories
        });
    })
    .post(protect, cloudinaryUpload.single("banner"), create)

// Get contribution by id
ContributionRouter.route("/contribution/:id")
    .get(getOneContribution)


module.exports = ContributionRouter;