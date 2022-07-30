const ROLES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER',
    CONTRIBUTOR: 'ROLE_CONTRIBUTOR'
}

/**
 * @description - This middleware calls next only if the user role matches the role passed in the route.
 * 
 * @param  {...Array} roles - roles to check
 * @returns {function} - next middleware
 * @returns {error} - if user is not authorized
 */
const checkRole = (...roles) => (req, res, next) => {
    if(!req.user){
        req.flash("error", "You must be logged in to do that");
        return res.redirect("/user/login");
    }

    const hasRole = roles.find(role => req.user.role === role);
    if(!hasRole){
        req.flash("error", "You are not authorized to do that");
        return res.redirect("/");
    }
    return next();
}

const role = { ROLES, checkRole };

module.exports = role;