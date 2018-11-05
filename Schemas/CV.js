const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

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

    education: [{
        institution: String,
        beginMonth: String,
        beginYear: Number,
        endMonth: String,
        endYear: Number,
        qualifications: String
    }],

    workExperience: [{
        company: String,
        jobTitle: String,
        beginMonth: String,
        beginYear: Number,
        endMonth: String,
        endYear: Number,
        jobDescription: String
    }],

    personalProfile: String,

});

const CV = mongoose.model('CV', CVSchema);