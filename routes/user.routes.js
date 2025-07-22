const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRole = require('../middlewares/auth.middleware').verifyRole;


router.get('/', userController.findAll);
router.get('/email/:email', userController.findOneByEmail);
router.get('/:username', verifyToken, verifyRole ("ADMIN"), userController.findOneByUsername);
router.post('/', userController.create);
router.patch('/:username', verifyToken, userController.update); // να ματσάρει το username με του token
router.delete('/:username', verifyToken, verifyRole ("ADMIN"), userController.deleteByUsername);

module.exports = router;