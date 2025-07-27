const express = require('express');
const router = express.Router();

const showController = require('../controllers/show.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRole = require('../middlewares/auth.middleware').verifyRole;

router.delete('/by-play-id/:playId', verifyToken, verifyRole ("ADMIN"), showController.deleteByPlayId);
router.get('/', showController.findAll);
router.get('/:id', showController.findOneById);
router.post('/', verifyToken, verifyRole ("ADMIN"), showController.create);
router.put('/:id', verifyToken, showController.update);
router.delete('/:id', verifyToken, verifyRole ("ADMIN"), showController.deleteById);


module.exports = router;
