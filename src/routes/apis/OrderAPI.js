const router = require('express').Router();
const orderController = require('../../controllers/OrderController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.get('/', authenticateJWT, orderController.getAllOrder);
router.post('/', authenticateJWT, orderController.createOrder);

router.put('/:orderID', authenticateJWT, isAdmin, orderController.updateOrderStatus);
router.get('/:orderID', authenticateJWT, orderController.getOrder);

module.exports = router;