require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB(); //Invoking the function for connecting the database


const server_port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
    res.send("Homepage")
})

app.listen(server_port, 
    console.log(`SERVER STARTED ON PORT ${server_port}`.brightBlue.bold))