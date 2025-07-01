const express = require('express');
const router = express.Router();

const hallController = require('../controllers/hall.controller');
// const verifyToken = require('../middlewares/auth.middleware').verifyToken;
// const verifyRole = require('../middlewares/auth.middleware').verifyRole;


router.get('/', hallController.findAll);
// router.get('/:id', playController.findOne);
router.post('/',  hallController.create);
// router.patch('/:id',  playController.update);
// router.delete('/:id',  playController.deleteById);

module.exports = router;