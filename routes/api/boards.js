
const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, boardsCtrl.index);
router.post('/', ensureLoggedIn, boardsCtrl.create)
router.post('/:id/items', ensureLoggedIn, boardsCtrl.addItem)
router.put('/:id', ensureLoggedIn, boardsCtrl.update)
router.delete('/:id', ensureLoggedIn, boardsCtrl.delete)

module.exports = router;