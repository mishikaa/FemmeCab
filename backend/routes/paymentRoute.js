const express = require('express');
const { makePayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST REQUEST FOR Payment
router.route('/')
    .post(makePayment)

module.exports = router