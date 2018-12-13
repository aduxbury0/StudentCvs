const CV = require('../../Schemas/CV');

module.exports = {

	createCV(inputCv) {
		return new Promise(async (resolve, reject) => {
			if(typeof inputCv.forename === 'undefined') {
				reject('Incorrect input for forename');
			}
			else if(typeof inputCv.surname === 'undefined') {
				reject('Incorrect input for surname');
			}
			else if(typeof inputCv.emailAddress === 'undefined') {
				reject('Incorrect input for emailAddress');
			}
			else if(typeof inputCv.dateOfBirth === 'undefined') {
				reject('Incorrect input for dateOfBirth');
			}
			else if(typeof inputCv.address.houseNumber === 'undefined') {
				reject('Incorrect input for houseNumber');
			}
			else if(typeof inputCv.address.road === 'undefined') {
				reject('Incorrect input for road');
			}
			else if(typeof inputCv.address.city === 'undefined') {
				reject('Incorrect input for city');
			}
			else if(typeof inputCv.address.county === 'undefined') {
				reject('Incorrect input for county');
			}
			else if(typeof inputCv.address.country === 'undefined') {
				reject('Incorrect input for country');
			}
			else if(typeof inputCv.education === 'undefined') {
				reject('Incorrect input for education');
			}
			else if(typeof inputCv.workExperience === 'undefined') {
				reject('Incorrect input for workExperience');
			}
			else if(typeof inputCv.personalProfile === 'undefined') {
				reject('Incorrect input for personalProfile');
			}
			else {
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
			}
		});
	},
    
	editCV(inputData) {
		return new Promise(async (resolve, reject) => {

			try{

				const updatedCV = await CV.findOneAndUpdate({emailAddress: inputData.emailAddress}, {

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
				resolve(updatedCV);
			}
			catch(err) {
				reject(err);
			}
		});
	},
    
	specificCVAccess(inputID) {
		return new Promise((resolve, reject) => {
            
			CV.findOne({_id: inputID})
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
				});
		});
	}
}