/**
 * Module imports.
 */
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

/**
 * Utils
 */
const ServerError = require("../../utils/ServerError.js");

/**
 * Config import.
 */
//  const SECRETS = require("../configs/config"); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

/**
 * Multer config.
 */
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'AuctionApp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

const cloudinaryUpload = multer({
    limits: {
        fileSize: 5000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new AppError("Please upload an image file", 400));
        }
        cb(undefined, true);
    },
    storage
});

module.exports = { cloudinary, cloudinaryUpload };