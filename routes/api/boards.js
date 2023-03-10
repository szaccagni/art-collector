
const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');

router.get('/', boardsCtrl.index);
router.post('/', boardsCtrl.create)
router.post('/:id/items', boardsCtrl.addItem)
router.put('/:id', boardsCtrl.update)
router.delete('/:id', boardsCtrl.delete)

module.exports = router;