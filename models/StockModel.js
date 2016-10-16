const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    'product': String,
    'expiryDate': String,
    'quantity' : Number 
}, { versionKey: 'version' });

const Stock = mongoose.model('Stock', stockSchema, 'Stock');

module.exports = Stock;
