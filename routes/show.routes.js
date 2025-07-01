const express = require('express');
const router = express.Router();

const showController = require('../controllers/show.controller');
// const verifyToken = require('../middlewares/auth.middleware').verifyToken;
// const verifyRole = require('../middlewares/auth.middleware').verifyRole;


router.get('/', showController.findAll);
router.get('/:id', showController.findOne);
router.post('/',  showController.create);
router.patch('/:id', showController.update);
router.delete('/:id', showController.deleteById);

module.exports = router;