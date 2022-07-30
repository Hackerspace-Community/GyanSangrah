/**
 * Node Modules.
 */
 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const bcrypt = require("bcrypt");


const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    status: {
        type: String,
        trim: true
    }
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;