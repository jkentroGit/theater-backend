const express = require('express');
const router = express.Router();

const playController = require('../controllers/play.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRole = require('../middlewares/auth.middleware').verifyRole;


router.get('/', playController.findAll);
router.get('/:code', playController.findOne);
router.post('/', verifyToken, verifyRole ("ADMIN"), playController.create);
router.patch('/:code', verifyToken, verifyRole ("ADMIN"), playController.update);
router.delete('/:code', verifyToken, verifyRole ("ADMIN"), playController.deleteByCode);

module.exports = router;