const multer = require("multer");
const storage = multer.memoryStorage();
const multerConfigs = {
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {            
        if (!file.originalname.match(/\.(pdf|doc|docx|txt|zip|pptx|png|jpg|jpeg)$/)) {
            return cb(new Error("Not a valid file type"));
        }
        cb(undefined, true);
    },
    storage
}

module.exports.upload = multer(multerConfigs);