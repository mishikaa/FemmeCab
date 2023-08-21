const express = require('express');
const { registerUser, authUser, editProfile, fetchProfile } = require('../controllers/userControllers');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST REQUEST FOR REGISTRATION
router.route('/')
    .post(registerUser)

// POST REQUEST FOR LOGIN
router.route('/login').post(authUser)

router.get('/map', protect, (req, res) => {
    console.log("Map route accessed")
})

router.route('/fetchProfile/:email').get(fetchProfile)
router.route('/editProfile').post(editProfile)

module.exports = router