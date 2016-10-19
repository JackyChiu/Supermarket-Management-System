'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const stockRoute = require('./routes/stock.js');
const volunteerRoute = require('./routes/volunteer.js');

const app = express();

// Mongoose settings
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise;

app.use(express.static(__dirname + '/public'));

// Routes
app.use('/stock', stockRoute);
app.use('/volunteer', volunteerRoute);

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});
