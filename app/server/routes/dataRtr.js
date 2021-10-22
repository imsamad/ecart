const express = require('express');

const router = express.Router();

const {
  getCountries,
  getStates,
  getStatesByCountryId,
  getCitiesByStateId,
  getCities,
} = require('../controllers/dataCtrl');

router.route('/cities').get(getCities);
router.route('/countries').get(getCountries);
router.route('/states').get(getStates);
router.route('/states/:cid').get(getStatesByCountryId);
router.route('/cities/:sid').get(getCitiesByStateId);

module.exports = router;
