const express = require('express');
const { getAddress } = require('../controllers/addressCtrl');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.get('/', protect, getAddress);
module.exports = router;
