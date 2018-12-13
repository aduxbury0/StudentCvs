const assert = require('assert');
const User = require('../Schemas/User');
const accountLogic = require('../modules/businessLogic/accountLogic');
const keys = require('../keys/keys');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('Account Logic Tests', () => {

    it('creates an account and hashes the password', (done) => {

        req = {
            body: {
                username: 'aduxbury',
                password: 'password',
                forename: 'Alex',
                surname: 'Duxbury',
                dateOfBirth: '17/12/1995',
                emailAddress: 'test@testing.ac.uk'
            }
        }

        accountLogic.register(req)
            .then((newUser) => {
                assert(newUser.username === req.body.username);
                assert(newUser.password !== req.body.password);
                User.findByIdAndDelete(newUser._id)
                .then(() => done())
                .catch(err => console.log(err));
                
            })
            .catch(err => console.log(err));

    });

    it('rejects on no-academic email', (done) => {
        
        req = {
            body: {
                username: 'aduxbury',
                password: 'password',
                forename: 'Alex',
                surname: 'Duxbury',
                dateOfBirth: '17/12/1995',
                emailAddress: 'test@testing.co.uk'
            }
        }

        accountLogic.register(req)
            .then(() => {})
            .catch(err => {
                assert(err === 'Email must be a UK academic email address');
                done();
            });
    });

    it('rejects on ommitted data when submitted (username)', (done) => {

        req = {
            body: {
                password: 'password',
                forename: 'Alex',
                surname: 'Duxbury',
                dateOfBirth: '17/12/1995',
                emailAddress: 'test@testing.ac.uk'
            }
        }
        
        accountLogic.register(req)
            .then(() => {})
            .catch(err => {
                assert(err === 'Username is required');
                done();
            });
    });

    it('Checks login process', (done) => {

        req = {
            body: {
                username: 'aduxbury',
                password: 'password'
            }
        }

        let hashedPassword = '';
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('password', salt, (err, hash) => {
                hashedPassword = hash;
                
                const newUser = new User({    
                    username: 'aduxbury',
                    password: hashedPassword,
                    userInfo: {
                        forename: 'Alex',
                        surname: 'Duxbury',
                        dateOfBirth: '17/12/1995',
                        emailAddress: 'test@testing.ac.uk'
                    }
                });
                newUser.save()
                .then((savedUser) => {

                    accountLogic.login(req)
                    .then((token) => {
                        jwt.verify(token, keys.jwtSecret, (err, decoded) => {
                            if(err) console.log(err);
                            assert(err !== true)
                            User.findByIdAndDelete(savedUser._id)
                            .then(() => done())
                            .catch(err => console.log(err));
                            
                        });

                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            });
        });
    });

    it('creates an error on incorrect password', (done) => {
        req = {
            body: {
                username: 'aduxbury',
                password: 'notPassword'
            }
        }

        let hashedPassword = '';
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('password', salt, (err, hash) => {
                hashedPassword = hash;
                
                const newUser = new User({    
                    username: 'aduxbury',
                    password: hashedPassword,
                    userInfo: {
                        forename: 'Alex',
                        surname: 'Duxbury',
                        dateOfBirth: '17/12/1995',
                        emailAddress: 'test@testing.ac.uk'
                    }
                });
                newUser.save()
                .then((savedUser) => {

                    accountLogic.login(req)
                    .then(() => {
                    })
                    .catch(err => {
                        assert(err === 'Incorrect Username or Password')
                        User.findByIdAndDelete(savedUser._id)
                        .then(() => done())
                        .catch(err => console.log(err));
                    });
                })
                .catch(err => console.log(err));
            });
        });
    });

    it('rejects with incorrect username', (done) => {

        req = {
            body: {
                username: 'noDuxbury',
                password: 'notPassword'
            }
        }

        accountLogic.login(req)
            .then(() => {})
            .catch((err) => {
                assert(err === 'user not found');
                done();
            });

    });

    it('adds a CV to an account', (done) => {
        const newUser = new User({    
			username: 'Android18',
			password: 'hashedPassword',
			userInfo: {
				forename: 'Alex',
				surname: 'Duxbury',
				dateOfBirth: '17/12/1995',
				emailAddress: 'test@testing.ac.uk'
			}
        });
        
        newUser.save()
        .then((savedUser) => {

            jwt.sign(savedUser.toJSON(), keys.jwtSecret, (err, token) => {
                if(err) console.log(err);
                else {
                    accountLogic.addCVtoAccount(token, 'eishf90h0LfG40fh34jrf')
                    .then((response) => {
                        assert(response === 'CV added');
                        User.findByIdAndDelete(savedUser._id)
                        .then(() => done())
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                }
            });

        })
        .catch(err => console.log(err));
    });

    it('fails on incorrect username', (done) => {

        wrongUsername = {
            username: 'wrongUser'
        }

        jwt.sign(wrongUsername, keys.jwtSecret, (err, token) => {
            if(err) console.log(err);
            else {
                accountLogic.addCVtoAccount(token, 'eishf90h0LfG40fh34jrf')
                .then(() => {})
                .catch(err => {
                    assert(err === 'No user found with username');
                    done();

                })
            }
        });
    });

});