const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server');
const User = require('../Schemas/User');
const accDataAccess = require('../modules/dataAccess/accountDataAccess');

jest.setTimeout(60000);

const mongoServer = new MongoMemoryServer();
mongoose.Promise = Promise;
mongoServer.getConnectionString().then((mongoUri) => {
    const mongooseOpts = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000, 
    }

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on('error', (err) => {
        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
          }
          console.log(e);
    });
    mongoose.connection.once('open', () => {
        console.log(`MongoDB connected to ${mongoUri}`);
    });
});


// beforeAll(async () => {

// });



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