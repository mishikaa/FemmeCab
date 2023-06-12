require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB(); //Invoking the function for connecting the database

app.use(express.json());

const server_port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
    res.send("Homepage")
})

app.use('/api/user', userRoutes);

app.listen(server_port, 
    console.log(`SERVER STARTED ON PORT ${server_port}`.brightBlue.bold))