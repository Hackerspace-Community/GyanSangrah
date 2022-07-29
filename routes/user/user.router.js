/**
 * Node Modules.
 */
const { Router } = require("express");

/**
 * Route Middlewares.
 */
const protect = require("../../middlewares/auth/protect.js");

/**
 * Auth controllers.
 */
const {
    register,
    login,
    logout,
    logoutAll
} = require("../../controllers/user/user.auth.controller.js");

// Declare router.
const UserRouter = Router();

/**
 * Routes
 */
UserRouter.route("/user/register")
    .get((req, res)=>{
        return res.render("user/register", {
            action: "/user/register",
        });
    })
    .post(register);

UserRouter.route("/user/login")
    .get((req, res)=>{
        return res.render("user/login", {
            action: "/user/login",
        });
    })
    .post(login);

UserRouter.route("/user/logout")
    .get(protect, logout);

UserRouter.route("/user/logoutAll")
    .get(protect, logoutAll);

UserRouter.route("/user/secret")
    .get(protect, (req, res)=>{
        return res.render("user/secret");
    });
module.exports = UserRouter;