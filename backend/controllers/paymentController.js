const expressAsyncHandler = require("express-async-handler");
const Payment = require ('../models/payment');

const shortid = require('shortid');
const Razorpay = require('razorpay');

// Payment integration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})

const makePayment = expressAsyncHandler(async(req, res) => {
    const payment_capture = 1
    const amount = parseInt(req.query.price) * 100
    const currency = 'INR'

    const options = {
        amount: amount,
        currency: currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)

        // console.log(response)
        
        const payment = await Payment.create({
            amount: amount/100, 
            transaction_id: `pay_${response.id.split("_")[1]}`,
            // user: req.user._id
        })

        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })

        // if(payment) {
        // res.status(201).json({
        //     id: response.id,
        //     currency: response.currency,
        //     amount: payment.amount,
        //     receipt: payment.receipt,
        //     user: payment.user
        // }) 
        // } else {
        //     res.status(400)
        //     throw new Error("Failed to make the payment.")
        // }
    } catch (error) {
        console.log(error)
    }
})

module.exports = {makePayment}