const router = require('express').Router();
const BookController = require('../../controllers/BookController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');
const uploader = require('../../config/uploadImg')

router.get('/', BookController.getAllBooks);
router.post('/', authenticateJWT, isAdmin, BookController.createBook);
router.put('/upload-image/:bookIDParams', authenticateJWT, isAdmin, uploader.array('images', 10), BookController.uploadBookImage)
router.put('/:bookIDParams', authenticateJWT, isAdmin, BookController.updateBook);
router.get('/:bookIDParams', BookController.getOneBook);
router.delete('/:bookIDParams', authenticateJWT, isAdmin, BookController.deleteBook);

module.exports = router;
