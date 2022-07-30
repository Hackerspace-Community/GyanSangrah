const multer = require("multer");

const ServerError = require("../../utils/ServerError.js");

const storage = multer.memoryStorage();

const multerConfigs = {
    limits: {
        fileSize: 5000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg|pdf|zip|pptx|doc|docx|txt)$/)) {
            return cb(new ServerError(400, "Please upload valid files"));
        }
        cb(undefined, true);
    },
    storage
}

const multerUpload = multer(multerConfigs);

module.exports = multerUpload;