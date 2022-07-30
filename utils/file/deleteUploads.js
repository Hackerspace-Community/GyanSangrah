const fs = require("fs");

/**
 * @description - Delete download if it exists.
 */
const deleteUploads = () => {
    if (fs.existsSync('./uploads')) {
        fs.rm('./uploads', { recursive: true }, (err) => {
            if (err) console.log(err);
        });
    }
}

module.exports = deleteUploads;