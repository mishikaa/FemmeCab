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

app.get('/', (req, res) => {
    res.send("Homepage")
})

app.use('/api/user', userRoutes);

app.use(cors())

app.use('/razorpay', paymentRoute);

// DEPLOYMENT
app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get('*', function(_, res) {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function(err) {
            if(err) {
                res.status(500).send(err);
            }
        }
    )
})
app.listen(server_port, 
    console.log(`SERVER STARTED ON PORT ${server_port}`.brightBlue.bold))