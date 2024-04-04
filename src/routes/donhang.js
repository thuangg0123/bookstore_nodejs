const router = require('express').Router();
const donHangController = require('../controllers/donHangController');
const { authenticateJWT, isAdmin } = require('../middleware/jwt');

router.get('/', authenticateJWT, donHangController.getAllDonHangs);
router.post('/', authenticateJWT, donHangController.createDonHang);

router.put('/:idDonHang', authenticateJWT, isAdmin, donHangController.updateStateDonHang);
router.get('/:idDonHang', authenticateJWT, donHangController.getOneDonHang);

module.exports = router;
