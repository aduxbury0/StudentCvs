const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CVSchema = new Schema({

	forename: String,
	surname: String,
	emailAddress: String,
	dateOfBirth: String,
	address: {
		houseNumber: String,
		road: String,
		city: String,
		county: String,
		country: String 
	},

	education: String,

	workExperience:String,

	personalProfile: String

});

const cv = mongoose.model('CV', CVSchema);

module.exports = cv;