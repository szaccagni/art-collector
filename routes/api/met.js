const express = require('express');
const router = express.Router();
const metCtrl = require('../../controllers/api/met');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/:term', ensureLoggedIn, metCtrl.search)
router.get('/filter/:filter/:term', ensureLoggedIn, metCtrl.filterSearch)
router.get('/objects/:id', ensureLoggedIn, metCtrl.getObjDetails)

module.exports = router;