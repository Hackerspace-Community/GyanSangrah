/**
 * Node Modules.
 */
 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const bcrypt = require("bcrypt");


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
    uploadDate: {
        type: Date,
        required: true
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
});