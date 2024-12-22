const express = require('express');
const router = express.Router();
const { updateLocation, getNearbyUsers } = require('../controllers/locationController');

router.post('/location', updateLocation);
router.get('/nearby-users', getNearbyUsers);

module.exports = router;
