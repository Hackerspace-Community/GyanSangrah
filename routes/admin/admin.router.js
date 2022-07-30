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
    allContributorRequest,
    ContributorRequestApprove,
    ContributorRequestDelete,
    allCategory, categoryAdd,  categoryDelete, categoryUpdate
  } = require("../../controllers/admin/admin.controller.js");
 
 // Declare router.
 const AdminRouter = Router();
 
 /**
  * Routes
  */


 AdminRouter.route("/admin/dashboard")
     .get((req, res)=>{
         return res.render("admin/dashboard", {
             action: "/user/register",
         });
     })
  //   .post(register);


  AdminRouter.route("/admin/contributorManagement")
    .get(allContributorRequest)

    AdminRouter.route("/admin/contributorManagementApprove/:id")
    .post(ContributorRequestApprove)

    AdminRouter.route("/admin/contributorManagementDelete/:id")
    .post(ContributorRequestDelete)

 

    AdminRouter.route("/admin/category")
    .get(allCategory)

    AdminRouter.route("/admin/categoryAdd")
    .post(categoryAdd)

    AdminRouter.route("/admin/categoryDelete/:id")
    .post(categoryDelete)

    AdminRouter.route("/admin/categoryUpdate")
    .post(categoryUpdate)




 module.exports = AdminRouter;