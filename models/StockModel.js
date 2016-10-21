const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    'product': { type: String, required: true },
    'expiryDate': String,
    'quantity' : Number,
    'orders': Number
}, { versionKey: 'version' });

const Stock = mongoose.model('Stock', stockSchema, 'Stock');

module.exports = Stock;
