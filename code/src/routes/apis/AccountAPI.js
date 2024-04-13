const router = require('express').Router();
const accountController = require('../../controllers/AccountController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.post('/login', accountController.login);
router.post('/logout', authenticateJWT, accountController.logout);
router.post('/register', accountController.register);
router.get('/', authenticateJWT, isAdmin, accountController.getAllAccount);
router.put('/:accountID', authenticateJWT, accountController.updateAccount);
router.delete('/:accountID', authenticateJWT, isAdmin, accountController.deleteAccount);
router.get('/:accountID', authenticateJWT, accountController.getAccount);
router.get('/check/login', authenticateJWT, accountController.getCurrentAccount);

module.exports = router;