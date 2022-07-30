/**
 * Node Modules.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    path: {
        type: String
    },
    filename: {
        type: String
    }
});

const contributionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    banner: bannerSchema,
    category: {
        type: String,
        enum:['science', 'art', 'tech'],
        trim: true
    },
    views: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

const Contribution = mongoose.model("Contribution", contributionSchema);
module.exports = Contribution;