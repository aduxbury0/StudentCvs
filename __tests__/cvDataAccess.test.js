const mongoose = require('mongoose');
const keys = require('../keys/keys');
const CV = require('../Schemas/CV');
const cvDataAccess = require('../modules/dataAccess/cvDataAccess');

beforeAll(() => {
	//if no local mongodb is present you can switch to the external testing database
	mongoose.connect('mongodb://alex:Password1@ds141783.mlab.com:41783/student-cvs-testing', {useNewUrlParser: true})
	//mongoose.connect('mongodb://localhost:27017/student-cvs-test')
		.then(() => console.log('MongoDB connected...'))
		.catch((err) => console.log(err));
})


afterAll(() => {

	mongoose.disconnect();

});

describe('Account Data Access Tests', async () => {

	it('creates a CV',(done) => {

		expect.assertions(5);
		inputCV = {
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '1',
				road: 'test rd',
				city: 'testville',
				county: 'Testfordshire',
				country: 'TestRepublic' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'
		}


		cvDataAccess.createCV(inputCV)
			.then(resultCV => {
				expect(resultCV.forename).toEqual(inputCV.forename);
				expect(resultCV.surname).toEqual(inputCV.surname);
				expect(resultCV.emailAddress).toEqual(inputCV.emailAddress);
				expect(resultCV.dateOfBirth).toEqual(inputCV.dateOfBirth);
				expect(resultCV.address).toEqual(inputCV.address);
				CV.deleteOne({_id: resultCV._id})
					.then(() => {
						done();
					})
					.catch(err => console.log(err));
                
			})
			.catch(err => {
				console.log(err);
			})        
	});

	it('edits a cv', (done) => {
		expect.assertions(4);

		inputCV = new CV({
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '1',
				road: 'test rd',
				city: 'testville',
				county: 'Testfordshire',
				country: 'TestRepublic' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'

		});
        

		editedCV = {
			forename: 'Bill',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '2',
				road: 'test ave.',
				city: 'testTown',
				county: 'Testfordshire',
				country: 'TestRepublic' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'
		}
            
        
		inputCV.save()
			.then(() => {
				cvDataAccess.editCV(editedCV)
					.then(updatedCV => {

						expect(updatedCV.forename).toBe(editedCV.forename);
						expect(updatedCV.address.houseNumber).toBe(editedCV.address.houseNumber);
						expect(updatedCV.address.road).toBe(editedCV.address.road);
						expect(updatedCV.address.city).toBe(editedCV.address.city);
    
						CV.deleteOne({_id: updatedCV._id})
							.then(() => {
								done();
							})
							.catch(err => console.log(err));
                

					})
					.catch(err => console.log(err));

			})
			.catch(err => console.log(err));
	})
    

	it('gets a cv by email', (done) => {
		expect.assertions(1);

		inputCV = new CV({
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test1@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '1',
				road: 'test rd',
				city: 'testville',
				county: 'Testfordshire',
				country: 'TestRepublic' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'

		});

		inputCV.save()
			.then(() => {

				cvDataAccess.specificCVAccess('test1@test.co.uk')
					.then(resultCV => {
						expect(resultCV.emailAddress).toBe('test1@test.co.uk');
						CV.deleteOne({_id: resultCV._id})
							.then(() => {
								done();
							})
							.catch(err => console.log(err));

					})
					.catch(err => console.log(err));

			})
			.catch(err => console.log(err));
	});

    it('gets an array of all CVs', (done) => {

        inputCV1 = new CV({
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '1',
				road: 'test rd',
				city: 'testville',
				county: 'Testfordshire',
				country: 'TestRepublic' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'

        });
        
        inputCV2 = new CV({
			forename: 'Alan',
			surname: 'duxbury',
			emailAddress: 'test2@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '12',
				road: 'test ave',
				city: 'testTown',
				county: 'Testfordshire',
				country: 'United this.States of React' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'

        });
        
        inputCV1.save()
        .then(() => {
            inputCV2.save()
            .then(() => {
                cvDataAccess.CVlistAccess()
                .then((cvArray) => {
                    expect(cvArray.size()).toBe(2);
                    CV.findOneAndDelete({_id: cvArray[0]._id})
                    .then(() => {
                        CV.findOneAndDelete({_id: cvArray[1]._id})
                        .then(() => {})
                        .catch(err => console.log(err))

                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

        



    })

});