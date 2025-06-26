const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
// const verifyToken = require('../middlewares/auth.middleware').verifyToken
// const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/', userController.findAll);
router.get('/:username', userController.findOne);
router.post('/', userController.create);
router.patch('/:username', userController.update);
router.delete('/:username', userController.deleteByUsername);
// router.delete('/:username/email/:email', userController.deleteByEmail )
// router.get('/check_duplicate_email/:email', userController.checkDuplicateEmail);

module.exports = router;