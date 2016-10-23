const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    'product': { type: String, required: true },
    'expiryDate': { type: String, required: true },
    'quantity' : { type: Number, min: 1, required: true },
    'orders': Number
}, { versionKey: 'version' });

const Stock = mongoose.model('Stock', stockSchema, 'Stock');

module.exports = Stock;
