/**
 * Node Modules.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

/**
 * Model options
 */
const opts = {
    toJSON: {
        virtuals: true
    }
}

/**
 * Image Schema
 */
const imageSchema = new Schema({
    path: {
        type: String
    },
    filename: {
        type: String
    }
},
{
    timestamps: true
}, opts)

/**
 * User Schema
 */
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
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
    phoneNumber: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Phone number is required"]
    },
    avatar: imageSchema,
    role: {
        type: String,
        enum: ["ROLE_USER", "ROLE_ADMIN", "ROLE_CONTRIBUTOR"],
        default: "ROLE_USER"
    },
    contributions: [{
        type: Schema.Types.ObjectId,
        ref: 'Contribution'
    }],
    contributorStatus: {
        type: String,
        enum: ["pending", "approved", "rejected", "none"],
        default: "none"
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