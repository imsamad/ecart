const express = require('express');

const {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAdddress,
} = require('../controllers/addressCtrl');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getMyAddresses).post(createAddress);
router.route('/:aid').put(updateAddress).delete(deleteAdddress);
module.exports = router;
