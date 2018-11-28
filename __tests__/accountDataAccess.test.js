const mongoose = require('mongoose');
const mongoMemoryServer = require('mongodb-memory-server');
const User = require('../Schemas/User');
const accDataAccess = require('../modules/dataAccess/accountDataAccess');

let mongoServer;

beforeAll(async () => {
    mongoServer = new mongoMemoryServer();

    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, (err) => {
        if(err) console.log(err);
    });
});



afterAll(() => {
    mongoose.disconnect();

});

describe('firstTest', () => {

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
            expect(foundUser).toEqual(expectedUser);
        }    
        catch(err) {
            console.log(err);
        }
    });
});