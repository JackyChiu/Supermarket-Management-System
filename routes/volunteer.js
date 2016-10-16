'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Volunteer = require('../models/VolunteerModel.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    Volunteer.find().lean().then((volunteerList) => {
        console.log(volunteerList);
        res.send(volunteerList);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
});

router.post('/', (req, res) => {
    console.log('=======Object Recieved======'); 
    console.log(req.body);

    const person = new Volunteer({
    	// TODO:
	});

    person.save().then((result) => {
        console.log(`Saved ${JSON.stringify(result, null, 4)});
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
});

router.put('/', (req, res) => {
    console.log(req.body); 
    Volunteer.findById(req._id).then((volunteer) => {
		// TODO        
		return volunteer.save();
    }).then((result) => {
        console.log(result);
        res.send(result);  
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
});

router.delete('/:id', (req, res) => {
    Volunteer.remove({
        'id': req.params._id
    }).then((result) => {
        console.log(`Deleted ${result}`);
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    }); 
});

module.exports = router;
