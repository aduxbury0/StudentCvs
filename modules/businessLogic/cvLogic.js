const cvAccess = require('../dataAccess/cvDataAccess');

module.exports = {

	createCV(req) {
		return new Promise((resolve, reject) => {
			const body = req.body;

			const newCV = {
				forename: body.forename,
				surname: body.surname,
				emailAddress: body.emailAddress,
				dateOfBirth: body.dateOfBirth,
				address: {
					houseNumber: body.houseNumber,
					road: body.road,
					city: body.city,
					county: body.county,
					country: body.country
				},
	
				education: body.education,
	
				workExperience: body.workExperience,
	
				personalProfile: body.personalProfile
			}
			cvAccess.createCV(newCV)
				.then((resultCV) => {
					resolve(resultCV);
				})
				.catch(err => {
					reject(err);
				});
		});
	},

	editCV(req) {
		return new Promise((resolve, reject) => {

			const body = req.body

			const editedCV = {
				forename: body.forename,
				surname: body.surname,
				emailAddress: body.emailAddress,
				dateOfBirth: body.dateOfBirth,
				address: {
					houseNumber: body.houseNumber,
					road: body.road,
					city: body.city,
					county: body.county,
					country: body.country
				},

				education: body.education,

				workExperience: body.workExperience,
	
				personalProfile: body.personalProfile
			}

			cvAccess.editCV(editedCV)
				.then((editedCVNew) => {
					resolve(editedCVNew);
				})
				.catch(err => reject(err));
		});
	},

	singleCv(req) {
		return new Promise((resolve, reject) => {
			
			let id = '';
			
			if(typeof req.params.id !== 'undefined' && req.params.id !== '') {
				id = req.params.id;
			}
			else {
				reject('no ID provided');
			}
			
			cvAccess.specificCVAccess(id)
				.then((foundCV) => {
					resolve(foundCV);
				})
				.catch(err => {
					reject(err);
				})
		});
	},

	cvList() {
		return new Promise((resolve, reject) => {

			cvAccess.CVlistAccess()
				.then((cvList) => {
					resolve(cvList)
				})
				.catch(err => reject(err));
		});
	}
}



