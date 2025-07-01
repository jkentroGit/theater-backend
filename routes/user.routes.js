const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRole = require('../middlewares/auth.middleware').verifyRole;


router.get('/',  userController.findAll);
router.get('/:username',   userController.findOne);
router.post('/', userController.create);
router.patch('/:username',  userController.update);
router.delete('/:username', userController.deleteByUsername);

module.exports = router;