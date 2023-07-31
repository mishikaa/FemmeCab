require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const paymentRoute = require('./routes/paymentRoute');

const app = express();
connectDB(); //Invoking the function for connecting the database

app.use(express.json());

const server_port = process.env.SERVER_PORT;

app.use('/api/user', userRoutes);

app.use(cors({
    origin: ["https://femme-cab-frontend.vercel.app"],
    methods: ["POST, GET"],
    credentials: true
}))

app.use('/razorpay', paymentRoute);

// DEPLOYMENT
if(process.env.NODE_ENV == "production") {
    const __dirname1 = path.resolve();
    app.use(express.static(path.resolve(__dirname1, "frontend", "build")))
    app.get('/', (req, res) => {
        res.send("hello")
    // res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    });
} else {
    app.get('/', (req, res) => {
        res.send("API is running successfully");
    })
}

app.listen(server_port, 
    console.log(`SERVER STARTED ON PORT ${server_port}`.brightBlue.bold))