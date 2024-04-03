const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img/product/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploader = multer({
    storage: storage,
});

module.exports = uploader;
