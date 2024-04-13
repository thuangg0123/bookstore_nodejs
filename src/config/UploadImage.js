const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img/product/');
    },
    filename: function (req, file, cb) {
        const fileName = `${uuidv4()}_${file.originalname}`;
        cb(null, fileName);
    }
});

const uploader = multer({
    storage: storage,
});

module.exports = uploader;
