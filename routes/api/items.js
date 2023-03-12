
const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.delete('/:id', ensureLoggedIn, boardsCtrl.removeItem)

module.exports = router;