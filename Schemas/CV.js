const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CVSchema = new Schema({

	user: {type: Schema.Types.ObjectID, ref: 'User'},
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

mongoose.model('CV', CVSchema);