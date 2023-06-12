const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');

const router = express.Router();

// POST REQUEST FOR REGISTRATION
router.route('/')
    .post(registerUser)

// POST REQUEST FOR LOGIN
router.route('/login').post(authUser)

module.exports = router