const shortid = require("shortid");
const { createWriteStream } = require("fs");

module.exports = async ({ stream, filename, mimetype }) => {
    const id = shortid.generate();
    // rename the file or you can let the current name
    const name = id + "_" + shortid.generate() + filename;
    // write path for the file
    const path = `uploads/${name}`;
    // (createWriteStream) writes our file to the images directory
    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(path))
            .on("finish", () => resolve({ id, path, name, mimetype })
            ).on("error", reject) // catch an error
    );
};