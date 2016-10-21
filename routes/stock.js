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
        res.status(500).end();
    });
});

router.put('/', (req, res) => {
    Stock.findById(req.body._id).then((stock) => {
        if (stock.quantity >= req.body.quantity) {
            stock.orders += (stock.quantity - req.body.quantity);
        }
        stock.quantity = req.body.quantity;
        return stock.save();
    }).then((result) => {
        console.log(`Edited: ${result}`);
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
