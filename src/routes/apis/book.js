const router = require('express').Router();
const bookController = require('../../controllers/BookController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');
const uploader = require('../../config/uploadImg')

router.get('/', bookController.getAllBooks);
router.post('/', authenticateJWT, isAdmin, bookController.addBook);
router.put('/upload-image/:bookIDParams', authenticateJWT, isAdmin, uploader.array('images', 10), bookController.uploadBookImage)
router.put('/:bookIDParams', authenticateJWT, isAdmin, bookController.updateBook);
router.get('/:bookIDParams', bookController.getBook);
router.delete('/:bookIDParams', authenticateJWT, isAdmin, bookController.deleteBook);

module.exports = router;
