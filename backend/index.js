require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const paymentRoute = require('./routes/paymentRoute');
const modelRoute = require('./routes/modelRoute');

const app = express();
connectDB(); //Invoking the function for connecting the database

const server_port = process.env.SERVER_PORT;

// origin: ["https://femme-cab.vercel.app"],

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials:true,   
    methods: ["POST, GET"]
}))

app.use(express.json());

// Different api calls
app.get('/', (req, res) => {
        res.send("API is running successfully")
});

// model api call
app.use('/api/webcam', modelRoute);

app.use('/api/user', userRoutes);

app.use('/razorpay', paymentRoute);

// Sending SOS
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(server_port, 
    console.log(`SERVER STARTED ON PORT ${server_port}`.brightBlue.bold))