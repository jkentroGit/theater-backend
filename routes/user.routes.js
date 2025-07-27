const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRole = require('../middlewares/auth.middleware').verifyRole;


router.get('/', userController.findAll);
router.get('/:username', verifyToken, verifyRole ("ADMIN"), userController.findOneByUsername);
router.post('/', userController.create);
router.patch('/:username', verifyToken, userController.update);
router.delete('/:username', verifyToken, verifyRole ("ADMIN"), userController.deleteByUsername);

module.exports = router;