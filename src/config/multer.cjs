const multer = require("multer");
const path = require("node:path");
const { v4 } = require("uuid");

const Storage = multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, callback) => {
        const uniqueName = `${v4()}-${file.originalname}`;
        callback(null, uniqueName);
    },
});

module.exports = {
    Storage,
};
