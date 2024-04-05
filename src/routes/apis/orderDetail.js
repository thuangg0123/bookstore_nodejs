const router = require('express').Router();
const orderDetailController = require('../../controllers/OrderDetailController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.get('/', authenticateJWT, orderDetailController.getAllOrderDetail);
router.post('/', authenticateJWT, orderDetailController.createOrderDetail);
router.get('/:orderId', authenticateJWT, orderDetailController.getOrderDetail);

module.exports = router;
