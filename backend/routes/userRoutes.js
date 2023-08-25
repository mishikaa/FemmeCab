const express = require('express');
const { registerUser, authUser, editProfile, fetchProfile, saveRideDetails } = require('../controllers/userControllers');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST REQUEST FOR REGISTRATION
router.route('/')
    .post(registerUser)

// POST REQUEST FOR LOGIN
router.route('/login').post(authUser)

router.route('/fetchProfile/:email').get(fetchProfile)

router.get('/map', protect, (req, res) => {
    console.log("Map route accessed")
})

router.route('/editProfile').post(editProfile)

// POST REQUEST FOR RIDE DETAILS
router.route('/saveRideDetails').post(saveRideDetails)
module.exports = router
