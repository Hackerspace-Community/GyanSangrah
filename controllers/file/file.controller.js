const fs = require("fs");

const catchAsync = require("../../utils/catchAsync.js");

const deleteUploads = require("../../utils/file/deleteUploads.js");

/**
 * @description - Generate a download link.
 */
module.exports.genDownloadLink = catchAsync(async (req, res, next) => {
    const {
        file,
        downloadPath,
        originalname
    } = req;

    setTimeout(() => {
        deleteUploads
    }, 5000);

    return res.download(downloadPath, originalname);
})
