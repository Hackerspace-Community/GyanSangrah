/**
 * Node Modules.
 */
 const { Router } = require("express");

 /**
  * Route Middlewares.
  */
 const protect = require("../../middlewares/auth/protect.js");
 const role = require("../../middlewares/auth/role.js");
 
 /**
  * Auth controllers.
  */


 const {
    allContributorRequest,
    contributorRequestApprove,
    contributorRequestDelete,
    addCategory,
    categoryAdd,
    categoryDelete,
    categoryUpdate
  } = require("../../controllers/admin/admin.controller.js");
 
 // Declare router.
 const AdminRouter = Router();
 
 /**
  * Routes
  */


 AdminRouter.route("/admin/dashboard")
     .get(protect, role.checkRole(role.ROLES.ADMIN), (req, res)=>{
         return res.render("admin/dashboard", {
             action: "/user/register",
         });
     })
  //   .post(register);


  AdminRouter.route("/admin/contributorManagement")
    .get(protect, role.checkRole(role.ROLES.ADMIN), allContributorRequest)

    AdminRouter.route("/admin/contributorManagementApprove/:id")
    .post(protect, role.checkRole(role.ROLES.ADMIN), contributorRequestApprove)

    AdminRouter.route("/admin/contributorManagementDelete/:id")
    .post(protect, role.checkRole(role.ROLES.ADMIN), contributorRequestDelete)

 

    AdminRouter.route("/admin/category")
    .get(protect, role.checkRole(role.ROLES.ADMIN), addCategory)

    AdminRouter.route("/admin/categoryAdd")
    .post(protect, role.checkRole(role.ROLES.ADMIN), categoryAdd)

    AdminRouter.route("/admin/categoryDelete/:id")
    .post(protect, role.checkRole(role.ROLES.ADMIN), categoryDelete)

    AdminRouter.route("/admin/categoryUpdate")
    .post(protect, role.checkRole(role.ROLES.ADMIN), categoryUpdate)




 module.exports = AdminRouter;