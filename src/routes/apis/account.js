const router = require('express').Router();
const accountController = require('../../controllers/AccountController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.post('/login', accountController.login);
router.post('/logout', authenticateJWT, accountController.logout);
router.post('/', accountController.register);
router.get('/', authenticateJWT, isAdmin, accountController.getAllAccounts);
router.put('/:idAccount', authenticateJWT, accountController.updateAccount);
router.delete('/:idAccount', authenticateJWT, isAdmin, accountController.deleteAccount);
router.get('/:idAccount', authenticateJWT, accountController.getOneAccount);

module.exports = router;
