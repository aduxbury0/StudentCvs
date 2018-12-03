// const accountLogic = require('../modules/businessLogic/accountLogic');
// const accountAccess = require('../modules/dataAccess/accountDataAccess');
// const sinon = require('sinon');

// beforeAll(() => {

//     const expectedUser = {
//         username: 'adux',
//         password: 'password',
//         userInfo: {
//             forename: 'Alex',
//             surname: 'Dux',
//             dateOfBirth: '17/12/1995',
//             emailAddress: 'test@test.test'
//         }
//     }

//     this.createAccount = sinon.stub(accountAccess, 'createAccount').resolves(expectedUser);

// })

// afterAll(() => {
//     this.createAccount.restore();
// })

// describe('createUserLogic', () => {

//     it('check if correct user is created', async done => {

//         req = {body: {

//             username: 'alex',
//             password: 'dux',
//             forename: 'Alex',
//             surname: 'Duxbury',
//             dateOfBirth: '17/12/1995',
//             emailAddress: 'test@test.com'
//         }}

//         try{
//             const result = await accountLogic.register(req);
//             expected = {
//                 username: 'alex',
//                 password: 'dux',
//                 userInfo: {
//                     forename: 'Alex',
//                     surname: 'Duxbury',
//                     dateOfBirth: '17/12/1995',
//                     emailAddress: 'test@test.com'
//                 }
//             }
    
//             expect(result).toBe(expected);
//         }
//         catch(err) {
//         }
//     });
// })