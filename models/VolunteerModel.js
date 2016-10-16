const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    'name': String,
    'monday': {
		start: String,
		end: String},
	'tuesday': {
		start: String,
		end: String},
	'wednesday': {
		start: String,
		end: String},
	'thursday': {
		start: String,
		end: String},
	'friday': {
		start: String,
		end: String},
	'saturday': {
		start: String,
		end: String}
}, { versionKey: 'version' });

const Volunteer = mongoose.model('Volunteer', volunteerSchema, 'Volunteer');

module.exports = Volunteer;
