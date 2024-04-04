const router = require('express').Router();
const OrderDetailController = require('../../controllers/OrderDetailController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.get('/', authenticateJWT, OrderDetailController.getAllOrderDetail);
router.post('/', authenticateJWT, OrderDetailController.createOrderDetail);
router.get('/:orderId', authenticateJWT, OrderDetailController.getOneOrderDetail);

module.exports = router;
