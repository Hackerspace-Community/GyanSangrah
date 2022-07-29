const jwt = require("jsonwebtoken");

/**
 * @description - Generates a auth token.
 * 
 * @param {String} id 
 * @returns {String} token
 */
module.exports.newToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
    });
}

/**
 * @description - Verifies a auth token.
 * 
 * @param {String} token
 * @returns {String} id
 */
module.exports.verifyToken = token => new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
            if(err) reject(err);
            resolve(payload);
        });
    });
