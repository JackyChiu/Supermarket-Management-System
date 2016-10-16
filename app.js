'use strict';

const express = require('express');
const mongoose = require('mongoose');
const stockRoute = require('routes/stock.js');
const volunteerRoute = require('routes/volunteer.js');

const app = express();

// Mongoose settings
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise;

// Middleware
app.use('/public', express.static('./public'));

// Routes
app.use('/', indexRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});