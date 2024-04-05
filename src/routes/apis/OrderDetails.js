const router = require('express').Router();
const orderDetailsController = require('../../controllers/OrderDetailsController');
const { authenticateJWT} = require('../../middleware/jwt');

router.get('/', authenticateJWT, orderDetailsController.getAllOrderDetails);
router.post('/', authenticateJWT, orderDetailsController.createOrderDetails);
router.get('/:orderID', authenticateJWT, orderDetailsController.getOrderDetails);

module.exports = router;
