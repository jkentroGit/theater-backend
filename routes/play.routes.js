const express = require('express');
const router = express.Router();

const playController = require('../controllers/play.controller');


router.get('/', playController.findAll);
router.get('/:code', playController.findOne);
router.post('/', playController.create);
router.patch('/:code', playController.update);
router.delete('/:code', playController.deleteByCode);

module.exports = router;