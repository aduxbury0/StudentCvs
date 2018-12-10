const mongoose = require('mongoose');
const cvLogic = require('../modules/businessLogic/cvLogic');
const cvAccess = require('../modules/dataAccess/cvDataAccess');
const sinon = require('sinon');

beforeAll(() => {

	//if no local mongodb is present you can switch to the external testing database
	mongoose.connect('mongodb://alex:duxbury1@ds129904.mlab.com:29904/student-cvs-testing-cv-logic', {useNewUrlParser: true})
	//mongoose.connect('mongodb://localhost:27017/student-cvs-test')
		.then(() => console.log('MongoDB connected...'))
		.catch((err) => console.log(err));
});

afterAll(() => {
    //db.dissconnect
    //mongoose.connection.close()
});


describe('CV Business Logic', () => {

    it('check if correct CV is created', () => {
        expect.assertions(1);

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
            console.log('in test CV: ');
            console.log(resultCV);
            expect(resultCV.forename).toBe('Alex');
            CV.findOneAndDelete({_id: resultCV._id})
                .then(() => {
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
})