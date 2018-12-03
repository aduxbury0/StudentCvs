const mongoose = require('mongoose');
const CV = require('../../Schemas/CV');

module.exports = cvDataAccess = {

	createCV(inputCv) {
		return new Promise(async (resolve, reject) => {
            
			const newcv = new CV({
				forename: inputCv.forename,
				surname: inputCv.surname,
				emailAddress: inputCv.emailAddress,
				dateOfBirth: inputCv.dateOfBirth,
				address: {
					houseNumber: inputCv.address.houseNumber,
					road: inputCv.address.road,
					city: inputCv.address.city,
					county: inputCv.address.county,
					country: inputCv.address.country 
				},

				education: inputCv.education,

				workExperience: inputCv.workExperience,

				personalProfile: inputCv.personalProfile
			});

			try{
				const resultCV = newcv.save();
				resolve(resultCV);
			}
			catch(err) {
				reject(err);
			}
		})
	},
    
	editCV(inputData) {
		return new Promise(async (resolve, reject) => {

			try{

				updatedCV = await CV.findOneAndUpdate({emailAddress: inputData.emailAddress}, {

					forename: inputData.forename,
					surname: inputData.surname,
					emailAddress: inputData.emailAddress,
					dateOfBirth: inputData.dateOfBirth,
					address: {
						houseNumber: inputData.address.houseNumber,
						road: inputData.address.road,
						city: inputData.address.city,
						county: inputData.address.county,
						country: inputData.address.country
					}
				}, {new: true});
				console.log(updatedCV);
				resolve(updatedCV);
			}
			catch(err) {
				reject(err);
			}
		});
	},
    
	specificCVAccess(inputEmail) {
		return new Promise((resolve, reject) => {
            
			CV.findOne({emailAddress: inputEmail})
				.then((foundCV) => {
					resolve(foundCV);
				})
				.catch(err => {
					reject(err);
				});

		})
	},
    
	CVlistAccess() {
		return new Promise((resolve, reject) => {
			CV.find({})
				.then(cvArray => {
					resolve(cvArray);
				})
				.catch(err => {
					reject(err);
				})
		})
	}
}