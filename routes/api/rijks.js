const express = require('express');
const router = express.Router();
const rijksCtrl = require('../../controllers/api/rijks');

// router.get('/:term/:resultsPerPg/:curPg', ensureLoggedIn, rijksCtrl.search)
router.post('/:term', rijksCtrl.search)

module.exports = router;