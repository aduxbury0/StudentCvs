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
			console.log(newCV);
			cvAccess.createCV(newCV)
				.then((resultCV) => {
					console.log(resultCV);
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
					console.log(editedCVNew);
					resolve(editedCVNew);
				})
				.catch(err => reject(err));
		});
	},

	singleCv(req) {
		return new Promise((resolve, reject) => {
			
			let id = ''
			
			if(typeof req.body.emailAddress !== 'undefined') {
				email = req.params.emailAddress;
			}
			else if(typeof req.body.email !== 'undefined') {
				email = req.params.email;
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



