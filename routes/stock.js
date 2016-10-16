'use strict'; 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Stock = require('../models/StockModel.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    Stock.find().lean().then((stockList) => {
        console.log(stockList);
        res.send(stockList);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
});

router.post('/', (req, res) => {
    console.log('=======Object Recieved======'); 
    console.log(req.body);

    const product = new Stock({
        'product': req.body.product,
        'expiryDate': req.body.expiryDate,
        'quantity': req.body.quantity,
        'orders': 0 
    });

    product.save().then((result) => {
        console.log(`Saved ${JSON.stringify(result, null, 4)}`);
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
});

router.put('/', (req, res) => {
    console.log(req.body); 
    Stock.findById(req._id).then((stock) => {
        stock.orders += (stock.quantity - req.body.quantity);
        stock.product = req.body.product;
        stock.expiryDate = req.body.expiryDate;
        stock.quantity = req.body.quantity;
        return stock.save();
    }).then((result) => {
        console.log(result);
        res.send(result);  
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
});

router.delete('/:id', (req, res) => {
    Stock.remove({
        '_id': req.params.id
    }).then((result) => {
        console.log(`Deleted ${result}`);
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    }); 
});

module.exports = router;
