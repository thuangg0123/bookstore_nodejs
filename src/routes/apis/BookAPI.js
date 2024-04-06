const router = require('express').Router();
const bookController = require('../../controllers/BookController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');
const uploader = require('../../config/UploadImage')

router.get('/', bookController.getAllBook);
router.post('/', authenticateJWT, isAdmin, bookController.addBook);
router.put('/upload-image/:bookID', authenticateJWT, isAdmin, uploader.array('images', 10), bookController.uploadBookImage)
router.put('/:bookID', authenticateJWT, isAdmin, bookController.updateBook);
router.get('/:bookID', bookController.getBook);
router.delete('/:bookID', authenticateJWT, isAdmin, bookController.deleteBook);

module.exports = router;