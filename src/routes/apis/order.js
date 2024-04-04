const router = require('express').Router();
const orderController = require('../../controllers/OrderController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.get('/', authenticateJWT, orderController.getAllOrders);
router.post('/', authenticateJWT, orderController.createOrder);

router.put('/:orderId', authenticateJWT, isAdmin, orderController.updateOrderStatus);
router.get('/:orderId', authenticateJWT, orderController.getOrder);

module.exports = router;
