const mongoose = require('mongoose');
const keys = require('../keys/keys');
const User = require('../Schemas/User');
const accDataAccess = require('../modules/dataAccess/accountDataAccess');

beforeAll(() => {
    mongoose.connect('mongodb://alex:Password1@ds141783.mlab.com:41783/student-cvs-testing', {useNewUrlParser: true})
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log(err));
})


afterAll(() => {
    mongoose.disconnect();
});

afterEach(() => {

    User.deleteMany({})
        .then(() => {

        })
        .catch(err => console.log(err));

})

describe('firstTest', () => {

    const User = require('../Schemas/User');


    it('gets a user', async () => {

        const expectedUser = {
            username: 'adux',
            password: 'password',
            userInfo: {
                forename: 'Alex',
                surname: 'Dux',
                dateOfBirth: '17/12/1995',
                emailAddress: 'test@test.test'
        }}

        const user = new User({
            username: 'adux',
            password: 'password',
            userInfo: {
                forename: 'Alex',
                surname: 'Dux',
                dateOfBirth: '17/12/1995',
                emailAddress: 'test@test.test'
            }});
        await user.save();

        try{
            const foundUser = await accDataAccess.singleAccount({username: 'adux'});
            try{
                expect(foundUser).toEqual(expectedUser);
            }
            catch(err) {
                console.log(err);
            }
            
        }    
        catch(err) {
            console.log(err);
        }
    });
});