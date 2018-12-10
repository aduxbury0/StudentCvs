const assert = require('assert');
const CV = require('../Schemas/CV');
const cvDataAccess = require('../modules/dataAccess/cvDataAccess');

describe('Account Data Access Tests', () => {

    it('creates a CV',(done) => {

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
                assert(resultCV.forename === 'Alex');
				CV.deleteOne({_id: resultCV._id})
					.then(() => {
						done();
					})
					.catch(err => console.log(err));
                
			})
			.catch(err => {
				console.log(err);
			});        
	});

	it('Tests incorrect forename for CV creation',(done) => {
		inputCV = {
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
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for forename');
			done();
		})

	});
	it('Tests incorrect surname for CV creation',(done) => {
		inputCV = {
			forename: 'Alex',
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
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for surname');
			done();
		})
	});
	it('Tests incorrect emailAddress for CV creation',(done) => {
		inputCV = {
			forename: 'Alex',
			surname: 'duxbury',
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
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for emailAddress');
			done();
		})
	});
	it('Tests incorrect dateOfBirth for CV creation',(done) => {
		inputCV = {
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
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
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for dateOfBirth')
			done();
		})
	});
	it('Tests incorrect houseNumber for CV creation',(done) => {
		inputCV = {
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
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
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for houseNumber');
			done();
		})
	});
	it('Tests incorrect road for CV creation',(done) => {
		inputCV = {
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '1',
				city: 'testville',
				county: 'Testfordshire',
				country: 'TestRepublic' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'
		}

		cvDataAccess.createCV(inputCV)
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for road');
			done();
		})
	});
	it('Tests incorrect city for CV creation',(done) => {
		inputCV = {
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '1',
				road: 'test rd',
				county: 'Testfordshire',
				country: 'TestRepublic' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'
		}
		cvDataAccess.createCV(inputCV)
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for city');
			done();
		})
	});

	it('Tests incorrect county for CV creation',(done) => {
		inputCV = {
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'test@test.co.uk',
			dateOfBirth: '17/12/1995',
			address: {
				houseNumber: '1',
				road: 'test rd',
				city: 'testville',
				country: 'TestRepublic' 
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'
		}

		cvDataAccess.createCV(inputCV)
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for county');
			done();
		})
	});

	it('Tests incorrect country for CV creation',(done) => {
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
			},

			education: 'test education',

			workExperience:'test experience',

			personalProfile: 'test profile'
		}

		cvDataAccess.createCV(inputCV)
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for country');
			done();
		})
	});

	it('Tests incorrect education for CV creation',(done) => {
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

			workExperience:'test experience',

			personalProfile: 'test profile'
		}
		cvDataAccess.createCV(inputCV)
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for education');
			done();
		})
	});

	it('Tests incorrect workExperience for CV creation',(done) => {
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

			personalProfile: 'test profile'
		}

		cvDataAccess.createCV(inputCV)
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for workExperience');
			done();
		})
	});

	it('Tests incorrect personalProfile for CV creation',(done) => {
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
		}

		cvDataAccess.createCV(inputCV)
		.then(() => {
			done();
		})
		.catch(err => {
			assert(err === 'Incorrect input for personalProfile');
			done();
		})
	});

	it('edits a cv', (done) => {

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
						assert(updatedCV.forename === 'Bill');
    
						CV.deleteOne({_id: updatedCV._id})
							.then(() => {
								done();
							})
							.catch(err => console.log(err));
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	});

	it('gets a cv by id', (done) => {

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
			.then((savedCV) => {
				cvDataAccess.specificCVAccess(savedCV._id)
					.then(resultCV => {
						let checkID = savedCV._id;
						let checkID2 = resultCV._id;
						console.log(checkID);
						console.log(typeof checkID);
						console.log(checkID2);
						console.log(typeof checkID2);
						// assert(checkID2 === checkID);
						assert.equal(checkID, checkID2);
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
			emailAddress: 'ArrayTest1@test.co.uk',
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
			emailAddress: 'ArrayTest2@test.co.uk',
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
					assert(cvArray.length > 2);
                    CV.findOneAndDelete({emailAddress: 'ArrayTest1@test.co.uk'})
                    .then(() => {
                        CV.findOneAndDelete({emailAddress: 'ArrayTest2@test.co.uk'})
						.then(() => {
							done();
						})
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => {
					CV.findOneAndDelete({_id: cvArray[0]._id})
                    .then(() => {
                        CV.findOneAndDelete({_id: cvArray[1]._id})
						.then(() => {
							done();
						})
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
				});
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
});