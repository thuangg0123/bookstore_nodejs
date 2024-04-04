const router = require('express').Router();
const sachController = require('../../controllers/sachController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');
const uploader = require('../../config/uploadImg')

router.get('/', sachController.getAllSachs);
router.post('/', authenticateJWT, isAdmin, sachController.createSach);
router.put('/upload-image/:idSach', authenticateJWT, isAdmin, uploader.array('images', 10), sachController.uploadImageSach)
router.put('/:idSach', authenticateJWT, isAdmin, sachController.updateSach);
router.get('/:idSach', sachController.getOneSach);
router.delete('/:idSach', authenticateJWT, isAdmin, sachController.deleteSach);

module.exports = router;
