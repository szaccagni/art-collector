
const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');

router.delete('/:id', boardsCtrl.removeItem)

module.exports = router;