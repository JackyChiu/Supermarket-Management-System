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
		'start': req.body.monday.start,
		'end': req.body.monday.end},
	'tuesday': {
		'start': req.body.tuesday.start,
		'end': req.body.tuesday.end},
	'wednesday': {
		'start': req.body.wednesday.start,
		'end': req.body.wednesday.end},
	'thursday': {
		'start': req.body.thursday.start,
		'end': req.body.thursday.end},
	'friday': {
		'start': req.body.friday.start,
		'end': req.body.friday.end},
	'saturday': {
		'start': req.body.saturday.start,
		'end': req.body.saturday.end},
	'sunday': {
		'start': req.body.sunday.start,
		'end': req.body.sunday.end}
	});

    person.save().then((result) => {
        console.log('Saved ${JSON.stringify(result, null, 4)}');
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
		 volunteer.name = req.body.name;
   		volunteer. monday = {
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
