const { Router } = require("express");

const FileRouter = Router();

const {
    genDownloadFile
} = require("../../middlewares/file/genDownloadFile.js");

const  {
    genDownloadLink
} = require("../../controllers/file/file.controller.js");

FileRouter.route("/file/:id")
    .get(genDownloadFile, genDownloadLink);

module.exports = FileRouter;