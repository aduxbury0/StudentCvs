accountAccess = require('../dataAccess/accountDataAccess');

module.exports = accountLogic = {

    register(req) {
        return new Promise((resolve, reject) => {
            const newUser = {
                username: req.body.username,
                password: req.body.password,
                userInfo: {
                    forename: req.body.forename,
                    surname: req.body.surname,
                    dateOfBirth: req.body.dateOfBirth,
                    emailAddress: req.body.emailAddress
                }
            }
            
            callCreateAccount(newUser);

        });
    },

    callCreateAccount(newUser) {
        accountAccess.createAccount(newUser)
        .then((returnedUser) => {
            resolve(returnedUser);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    }
}



