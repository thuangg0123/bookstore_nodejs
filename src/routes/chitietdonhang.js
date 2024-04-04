const router = require('express').Router();
const chiTietDonHangController = require('../controllers/chiTietDonHangController');
const { authenticateJWT, isAdmin } = require('../middleware/jwt');

router.get('/', authenticateJWT, chiTietDonHangController.getAllChiTietDonHangs);
router.post('/', authenticateJWT, chiTietDonHangController.createChiTietDonHang);
router.get('/:idDonHang', authenticateJWT, chiTietDonHangController.getOneChiTietDonHang);

module.exports = router;
