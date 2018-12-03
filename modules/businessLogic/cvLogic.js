cvAccess = require('../dataAccess/cvDataAccess');

module.exports = {

	createCV(req) {



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
				}
			}

				cvAccess.editCV(editedCV)
				.then((editedCVNew) => {
					console.log(editedCVNew);
					resolve(editedCVNew);
				})
				.catch(err => reject(err));
		});
	},

	singleCv(req) {},

	cvList() {},

}



