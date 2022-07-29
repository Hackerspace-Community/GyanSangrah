/**
 * Node Modules.
 */
const mongoose = require("mongoose");

/**
 * @description - Connects the app to the database.
 * 
 * @param {String} url - MongoDB connection URI. 
 * @default url - "The URI mentioned in .env file"
 * @return 
 */
const connectDB = ( url = process.env.MONGODB_URI) => {
    try {
        const con = mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if(con) console.log("MongoDB connected...");
    } catch (e) {
        console.error(e);
    }
}

module.exports = connectDB;