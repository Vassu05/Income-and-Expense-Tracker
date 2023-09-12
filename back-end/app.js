const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());




// Routes
const transactionRoute = require('./routes/transactionRoute');
app.use('/api/transaction',transactionRoute);



// DataBase

mongoose.connect(process.env.URI);
const connection = mongoose.connection;
connection.once('open',() => {
    console.log('connection to database successful');
});

// Server

app.listen(PORT,() => {
    console.log(`The server is running at port: ${PORT}`);
});