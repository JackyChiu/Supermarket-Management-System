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
        'name': req.body.name,
        'monday': {
            'start': req.body.monday.start || null,
            'end': req.body.monday.end || null
        },
        'tuesday': {
            'start': req.body.tuesday.start || null,
            'end': req.body.tuesday.end || null
        },
        'wednesday': {
            'start': req.body.wednesday.start || null,
            'end': req.body.wednesday.end || null
        },
        'thursday': {
            'start': req.body.thursday.start || null,
            'end': req.body.thursday.end || null
        },
        'friday': {
            'start': req.body.friday.start || null,
            'end': req.body.friday.end || null
        },
        'saturday': {
            'start': req.body.saturday.start || null,
            'end': req.body.saturday.end || null
        }
	});

    person.save().then((result) => {
        console.log(`Saved ${JSON.stringify(result, null, 4)}`);
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
});
/*
router.put('/', (req, res) => {
    console.log(req.body);
    Volunteer.findById(req._id).then((volunteer) => {
		// TODO
		 volunteer.name = req.body.name;
   		volunteer.monday = {
   			volunteer.monday.start = req.body.monday.start;
			  volunteer.monday.end = req.body.monday.end
      };
		 volunteer.tuesday = {
			volunteer.start = req.body.tuesday.start;
			volunteer.end = req.body.tuesday.end};
		 volunteer.wednesday = {
			volunteer.start= req.body.wednesday.start;
			volunteer.end= req.body.wednesday.end};
		 volunteer.thursday = {
			volunteer.start= req.body.thursday.start;
			volunteer.end= req.body.thursday.end};
		 volunteer.friday = {
			volunteer.start= req.body.friday.start;
			volunteer.end= req.body.friday.end};
		 volunteer.saturday = {
			volunteer.start= req.body.saturday.start;
			volunteer.end= req.body.saturday.end};
		 volunteer.sunday = {
			volunteer.start= req.body.sunday.start;
			volunteer.end= req.body.sunday.end}
		return volunteer.save();
    }).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
});
*/
router.delete('/:id', (req, res) => {
    Volunteer.remove({
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
