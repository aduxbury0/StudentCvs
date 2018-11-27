const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

	username: String,
	password: String,
	userInfo: {
		forename: String,
		surname: String,
		dateOfBirth: String,
		emailAddress: String
	}
});

mongoose.model('User', UserSchema);