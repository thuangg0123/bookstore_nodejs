const router = require('express').Router();
const taikhoanController = require('../../controllers/taikhoanController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.post('/login', taikhoanController.login);
router.post('/logout', authenticateJWT, taikhoanController.logout);
router.post('/', taikhoanController.register);
router.get('/', authenticateJWT, isAdmin, taikhoanController.getAllTaiKhoans);
router.put('/:idTaiKhoan', authenticateJWT, taikhoanController.updateTaiKhoan);
router.delete('/:idTaiKhoan', authenticateJWT, isAdmin, taikhoanController.deleteTaiKhoan);
router.get('/:idTaiKhoan', authenticateJWT, taikhoanController.getOneTaiKhoan);

module.exports = router;
