require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const paymentRoute = require('./routes/paymentRoute');

const app = express();
connectDB(); //Invoking the function for connecting the database

const server_port = process.env.SERVER_PORT;

app.use(cors({
    origin: ["https://femme-cab.vercel.app"],
    // origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true
}))

app.use(express.json());

app.get('/', (req, res) => {
        res.send("API is running successfully")
});

app.use('/api/user', userRoutes);

app.use('/razorpay', paymentRoute);

app.listen(server_port, 
    console.log(`SERVER STARTED ON PORT ${server_port}`.brightBlue.bold))