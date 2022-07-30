/**
 * Node Modules.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * File Schema
 */
const fileSchema = new Schema({
    originalname: {
        type: String
    },
    encoding: {
        type: String
    },
    buffer: {
        type: Buffer
    },
    size: {
        type: Number
    },
    downloadCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

/**
 * Banner Schema
 */
// const bannerSchema = new Schema({
//     path: {
//         type: String
//     },
//     filename: {
//         type: String
//     }
// });

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
    banner: {
        type: String,
    },
    files: [fileSchema],
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
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