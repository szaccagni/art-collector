const express = require('express');
const router = express.Router();
const rijksCtrl = require('../../controllers/api/rijks');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// router.get('/:term/:resultsPerPg/:curPg', ensureLoggedIn, rijksCtrl.search)
router.post('/:term', ensureLoggedIn, rijksCtrl.search)

module.exports = router;