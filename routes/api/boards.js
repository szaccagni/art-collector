
const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');

// router.get('/', boardsCtrl.index);
router.post('/', boardsCtrl.create)

module.exports = router;