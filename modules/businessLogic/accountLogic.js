const bcrypt = require('bcrypt');
const accountAccess = require('../dataAccess/accountDataAccess');
const jwt = require('jsonwebtoken');
const keys = require('../../keys/keys');

module.exports = {


    register(req) {
        return new Promise((resolve, reject) => {
            const body = req.body;
            let hashedPassword = '';
            bcrypt.genSalt(10, salt, (err, hash) => {
                hashedPassword = hash;
                
                newUser = {
                    username: body.username,
                    password: hashedPassword,
                    userInfo: {
                        forename: body.forename,
                        surname: body.surname,
                        dateOfBirth: body.dateOfBirth,
                        emailAddress: body.emailAddress
                    }
                }

                accountAccess.createAccount(newUser)
                .then((createdUser) => {
                    if(typeof createdUser !== 'undefined') {
                        resolve(createdUser);
                    }
                    else {
                        reject('Registration Error');
                    }
                })
                .catch(err => reject(err));
            });           
        });
    },

    login(req) {
        const body = req.body
        accountAccess.singleAccount(body.username)
        .then((foundUser) => {
            if(typeof foundUser !== 'undefined'){
                bcrypt.compare(body.password, foundUser.password, (err, isMatch) => {
                    if(err) reject(err);
                    if(isMatch) {
                        // const jsonUser = foundUser.toJSON();
                        const token = jwt.sign(foundUser, keys.jwtSecret, {
                            expiresIn: '24h'
                        });
                        resolve(token);
                    }
                    else{
                        reject('Incorrect Username or Password')
                    }

                })

            }
        })
        .catch(err => reject(err));


    },

    logout() {}


}