const express = require('express');
const router = express.Router();

const playController = require('../controllers/play.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRole = require('../middlewares/auth.middleware').verifyRole;

router.get('/', playController.findAll);
router.get('/:id', playController.findOneById);
router.get('/code/:code', playController.findOneByCode);
router.post('/', playController.create);
router.put('/:code', verifyToken, verifyRole("ADMIN"), playController.update);
router.delete('/:code', playController.deleteByCode);

module.exports = router;