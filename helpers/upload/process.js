const storeUpload = require("./store");
const { createReadStream } = require("fs")
module.exports = async (upload) => {
    const { filename, mimetype } = await upload;
    const stream = createReadStream();
    // send this file to store it
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
};
