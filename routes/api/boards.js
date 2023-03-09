
const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');

router.get('/', boardsCtrl.index);
router.post('/', boardsCtrl.create)
router.post('/:id/items', boardsCtrl.addItem)

module.exports = router;