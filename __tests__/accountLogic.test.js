const accountLogic = require('../modules/businessLogic/accountLogic');

describe('createUserLogic', () => {

    test('check if correct user is created', async done => {

        expect.assertions(1);

        req = {body: {

            username: 'alex',
            password: 'dux',
            forename: 'Alex',
            surname: 'Duxbury',
            dateOfBirth: '17/12/1995',
            emailAddress: 'test@test.com'
        }}

        try{
            const result = await accountLogic.register(req);
            expected = {
                username: 'alex',
                password: 'dux',
                userInfo: {
                    forename: 'Alex',
                    surname: 'Duxbury',
                    dateOfBirth: '17/12/1995',
                    emailAddress: 'test@test.com'
                }
            }
    
            expect(result).toBe(expected);
        }
        catch(err) {
        }
    });
})