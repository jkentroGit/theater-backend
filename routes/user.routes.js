const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRole = require('../middlewares/auth.middleware').verifyRole;


router.get('/', verifyToken, verifyRole ("ADMIN"), userController.findAll);
router.get('/:username', verifyToken, verifyRole ("ADMIN"), userController.findOne);
router.post('/', userController.create);
router.patch('/:username', verifyToken, userController.update); // να ματσάρει το username με του token
router.delete('/:username', verifyToken, verifyRole ("ADMIN"), userController.deleteByUsername);

module.exports = router;