const fs = require("fs");
const Readable = require("stream").Readable;

const catchAsync = require("../../utils/catchAsync.js");

const Contribution = require("../../models/contribution.model.js");

/**
 * @description - Generate a donwload file.
 */
module.exports.genDownloadFile = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    // Find the contribution that contains the following file id in its files array
    const contribution = await Contribution.findOne({
        files: {
            $elemMatch: {
                _id: id
            }
        }
    });

    // Find the file that contains the following file id
   

    const file = contribution.files[0];

    const fileExtension = file.originalname.split(".").pop();
    const fileData = file.buffer;

    const readable = new Readable();
    readable.push(fileData);
    readable.push(null);

    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
    }

    if (!fs.existsSync(`./uploads/${file.originalname.split(".")[0]}.${fileExtension}`)) {
        const writeStream = fs.createWriteStream(`./uploads/${file.originalname.split(".")[0]}.${fileExtension}`);
        readable.pipe(writeStream);
    }

    req.file = file;
    req.downloadPath = `./uploads/${file.originalname.split(".")[0]}.${fileExtension}`;
    req.originalname = file.originalname;

    setTimeout(() => {
        next();
    }, 2000)

});