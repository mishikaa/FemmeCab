require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const paymentRoute = require('./routes/paymentRoute');

const app = express();
connectDB(); //Invoking the function for connecting the database

app.use(express.json());

const server_port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
    res.send("Homepage")
})

app.use('/api/user', userRoutes);

app.use(cors())

app.use('/razorpay', paymentRoute);


// app.post('/razorpay', async(req, res) => {
//     const payment_capture = 1
//     const amount = parseInt(req.query.price) * 100
//     const currency = 'INR'

//     const options = {
//         amount: amount,
//         currency: currency,
//         receipt: shortid.generate(),
//         payment_capture
//     }

//     try {
//         const response = await razorpay.orders.create(options)
//         console.log(response)
//         res.json({
//             id: response.id,
//             currency: response.currency,
//             amount: response.amount
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

app.listen(server_port, 
    console.log(`SERVER STARTED ON PORT ${server_port}`.brightBlue.bold))