/**
 * Node Modules.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

/**
 * User Schema
 */
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["ROLE_USER", "ROLE_ADMIN", "ROLE_CONTRIBUTOR"],
        default: "ROLE_USER"
    },
    tokens: [{
        token: {
            type: String,
            required: [true, "auth token is required"]
        }
    }]
}, 
{
    timestamps: true
});

/**
 * Before saving hash and salt the password if it has been modified.
 */
userSchema.pre("save", async function(next) {
    try {
        if (this.isModified("password")) {
            const hash = await bcrypt.hash(this.password, 8);
            this.password = hash;
        }
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Compare the hashed password with the password provided.
 */
userSchema.methods.comparePassword = async function(password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, passwordHash, (err, isMatch)=>{
            if(err) reject(err);
            resolve(isMatch);
        });
    });
}

const User = mongoose.model("User", userSchema);
module.exports = User;