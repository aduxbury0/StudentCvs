const mongoose = require('mongoose');
const cvLogic = require('../modules/businessLogic/cvLogic');
const cvAccess = require('../modules/dataAccess/cvDataAccess');
const sinon = require('sinon');

beforeAll(() => {

	//if no local mongodb is present you can switch to the external testing database
	mongoose.connect('mongodb://alex:Password1@ds141783.mlab.com:41783/student-cvs-testing', {useNewUrlParser: true})
	//mongoose.connect('mongodb://localhost:27017/student-cvs-test')
		.then(() => console.log('MongoDB connected...'))
		.catch((err) => console.log(err));


});

afterAll(() => {
    mongoose.disconnect();
});

describe('CV Business Logic', () => {

    it('check if correct user is created', done => {
        expect.assertions(3);

        req = {body: {
            forename: 'Alex',
			surname: 'duxbury',
            emailAddress: 'test@test.co.uk',
            dateOfBirth: '17/12/1995',
            houseNumber: '1',
			road: 'test rd',
			city: 'testville',
			county: 'Testfordshire',
            country: 'TestRepublic',
            education: 'test education',
			workExperience:'test experience',
			personalProfile: 'test profile'
        }}
        console.log(req);
        cvLogic.createCV(req)
        .then((resultCV) => {
            console.log('resultCV: ');
            console.log(resultCV);
            expect(resultCV.forename).toBe('Alex');
            expect(resultCV.emailAddress).toBe('test@test.co.uk');
            expect(resultCV.address.houseNumber).toBe('1');
            CV.deleteOne({_id: resultCV._id})
					.then(() => {
						done();
					})
					.catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        
        

    });
})