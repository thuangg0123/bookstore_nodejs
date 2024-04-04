const router = require('express').Router();
const OrderController = require('../../controllers/OrderController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.get('/', authenticateJWT, OrderController.getAllOrders);
router.post('/', authenticateJWT, OrderController.createOrder);

router.put('/:orderId', authenticateJWT, isAdmin, OrderController.updateOrderStatus);
router.get('/:orderId', authenticateJWT, OrderController.getOneOrder);

module.exports = router;
