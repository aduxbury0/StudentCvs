const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserSchema = new Schema({

    username: String,
    password: String,
    userInfo: {
        forename: String,
        Surname: String,
        dateOfBirth: String,
        emailAddress: String
    }
});

const User = mongoose.model('User', UserSchema);