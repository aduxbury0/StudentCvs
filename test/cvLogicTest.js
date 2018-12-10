const mongoose = require('mongoose');
const cvLogic = require('../modules/businessLogic/cvLogic');

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
            assert(result.forename === 'Alex');
            CV.findOneAndDelete({_id: resultCV._id})
                .then(() => {
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
});