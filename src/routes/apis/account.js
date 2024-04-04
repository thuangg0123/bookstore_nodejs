const router = require('express').Router();
const AccountController = require('../../controllers/AccountController');
const { authenticateJWT, isAdmin } = require('../../middleware/jwt');

router.post('/login', AccountController.login);
router.post('/logout', authenticateJWT, AccountController.logout);
router.post('/', AccountController.register);
router.get('/', authenticateJWT, isAdmin, AccountController.getAllAccounts);
router.put('/:idAccount', authenticateJWT, AccountController.updateAccount);
router.delete('/:idAccount', authenticateJWT, isAdmin, AccountController.deleteAccount);
router.get('/:idAccount', authenticateJWT, AccountController.getOneAccount);

module.exports = router;
