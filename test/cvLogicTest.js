const mongoose = require('mongoose');
const cvLogic = require('../modules/businessLogic/cvLogic');
const CV = require('../Schemas/CV');
const assert = require('assert');

describe('CV Business Logic', () => {

    it('check if correct CV is created', () => {

        req = {
            body: {
                forename: 'Alex',
                surname: 'duxbury',
                emailAddress: 'test@test.co.uk',
                dateOfBirth: '17/12/1995',
                houseNumber: '1',
                road: 'test road street',
                city: 'testville',
                county: 'Testfordshire',
                country: 'TestRepublic',
                education: 'test education',
                workExperience:'test experience',
                personalProfile: 'test profile'
            }
        }

        cvLogic.createCV(req)
        .then((resultCV) => {
            assert(resultCV.forename === 'Alex');
            CV.findOneAndDelete({_id: resultCV._id})
                .then(() => {
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });

    it('checks whether CV is edited', (done) => {

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

        req = {
            body: {
                forename: 'Bill',
                surname: 'duxbury',
                emailAddress: 'test@test.co.uk',
                dateOfBirth: '17/12/1995',
                houseNumber: '2',
                road: 'test ave.',
                city: 'testTown',
                county: 'Testfordshire',
                country: 'TestRepublic' ,
                education: 'test education',
                workExperience:'test experience',
                personalProfile: 'test profile'

            }
        }
        
        inputCV.save()
            .then(() => {
                cvLogic.editCV(req)
                    .then((editedCV) => {
                        assert(editedCV.forename === 'Bill');
                        CV.findOneAndDelete({_id: editedCV._id})
                            .then(() => {
                                done();
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

    it('checks getting a single cv', (done) => {
        inputCV = new CV({
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'testtacular@test.co.uk',
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
                req = {
                    params: {
                        id: savedCV._id
                    }
                }

                cvLogic.singleCv(req)
                .then((foundCV) => {
                    assert(foundCV.emailAddress === 'testtacular@test.co.uk');
                    CV.findOneAndDelete({_id: foundCV._id})
                            .then(() => {
                                done();
                            })
                            .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

    it('checks with no ID', (done) => {

        const req = {
            params: {
                id: ''
            }
        }

        cvLogic.singleCv(req)
        .then(() => {

        })
        .catch(err => {
            assert(err === 'no ID provided');
            done();
        });
    });

    it('checks with undefined', (done) => {

        const req = {
            params: {
                
            }
        }

        cvLogic.singleCv(req)
        .then(() => {

        })
        .catch(err => {
            assert(err === 'no ID provided');
            done();
        });
    });

    it('gets a list of all CVs', (done) => {
        inputCV1 = new CV({
			forename: 'Alex',
			surname: 'duxbury',
			emailAddress: 'Array2Test1@test.co.uk',
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
			emailAddress: 'Array2Test2@test.co.uk',
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
                cvLogic.cvList()
                .then((cvArray) => {
					assert(cvArray.length > 2);
                    CV.findOneAndDelete({emailAddress: 'Array2Test1@test.co.uk'})
                    .then(() => {
                        CV.findOneAndDelete({emailAddress: 'Array2Test2@test.co.uk'})
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