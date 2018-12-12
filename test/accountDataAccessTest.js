const assert = require('assert');
const User = require('../Schemas/User');
const accountDataAccess = require('../modules/dataAccess/accountDataAccess');

describe('Account Data Access Tests', () => {

	it('gets a single account', (done) => {

		inputUser = new User({
			username: 'adux',
			password: 'oifheolsifnosnf93ur9-3jrf9jf9',
			userInfo: {
				forename: 'Alex',
				surname: 'Dux',
				dateOfBirth: '17/12/1995',
				emailAddress: 'test@testing.come'
			}
		});

		inputUser.save()
			.then((savedUser) => {
				accountDataAccess.singleAccount(savedUser.username)
					.then((foundUser) => {
						assert(foundUser.username === 'adux')
						User.findByIdAndDelete(savedUser._id)
							.then(() => done())
							.catch(err => console.log(err));
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	});

	it('fails to get an account with an incorrect username', (done) => {
		const incorrectUser = 'thisIsAnIncorrectUser'
		accountDataAccess.singleAccount(incorrectUser)
			.then(() => {
            })
			.catch((err) => {
				assert(err === 'user not found');
				done();
			})

	});

	it('fails on wrong data type passed to function', (done) => {
		const incorrectUser = {};
		accountDataAccess.singleAccount(incorrectUser)
			.then(() => {				
			})
			.catch(err => {
				assert(err === 'Registration Database error');
				done();
			})
	});

	it('creates an account', (done) => {
		inputUser = {
			username: 'adux',
			password: 'oifheolsifnosnf93ur9-3jrf9jf9',
			userInfo: {
				forename: 'Alex',
				surname: 'Dux',
				dateOfBirth: '17/12/1995',
				emailAddress: 'test@testing.come'
			}
		}

		accountDataAccess.createAccount(inputUser)
			.then((createdUser) => {
				assert(createdUser.username === 'adux');
				User.findByIdAndDelete(createdUser._id)
					.then(() => done())
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	});

	it('fails on no username', (done) => {
		inputUser = {
			password: 'oifheolsifnosnf93ur9-3jrf9jf9',
			userInfo: {
				forename: 'Alex',
				surname: 'Dux',
				dateOfBirth: '17/12/1995',
				emailAddress: 'test@testing.come'
			}
		}

		accountDataAccess.createAccount(inputUser)
			.then(() => {})
			.catch((err) => {
				assert(err === 'Username is required');
				done();
			});

	});
	it('fails on no password', (done) => {
		inputUser = {
			username: 'adux',
			userInfo: {
				forename: 'Alex',
				surname: 'Dux',
				dateOfBirth: '17/12/1995',
				emailAddress: 'test@testing.come'
			}
		}

		accountDataAccess.createAccount(inputUser)
			.then(() => {})
			.catch((err) => {
				assert(err === 'Password is required');
				done();
			});
	});
	it('fails on no forename', (done) => {
		inputUser = {
			username: 'adux',
			password: 'oifheolsifnosnf93ur9-3jrf9jf9',
			userInfo: {
				surname: 'Dux',
				dateOfBirth: '17/12/1995',
				emailAddress: 'test@testing.come'
			}
		}

		accountDataAccess.createAccount(inputUser)
			.then(() => {})
			.catch((err) => {
				assert(err === 'Forename is required');
				done();
			});
	});
	it('fails on no surname', (done) => {
		inputUser = {
			username: 'adux',
			password: 'oifheolsifnosnf93ur9-3jrf9jf9',
			userInfo: {
				forename: 'Alex',
				dateOfBirth: '17/12/1995',
				emailAddress: 'test@testing.come'
			}
		}

		accountDataAccess.createAccount(inputUser)
			.then(() => {})
			.catch((err) => {
				assert(err === 'Surname is required');
				done();
			});
	});
	it('fails on no date of birth', (done) => {
		inputUser = {
			username: 'adux',
			password: 'oifheolsifnosnf93ur9-3jrf9jf9',
			userInfo: {
				forename: 'Alex',
				surname: 'Dux',
				emailAddress: 'test@testing.come'
			}
		}

		accountDataAccess.createAccount(inputUser)
			.then(() => {})
			.catch((err) => {
				assert(err === 'Date of Birth is required');
				done();
			});
	});
	it('fails on no email', (done) => {
		inputUser = {
			username: 'adux',
			password: 'oifheolsifnosnf93ur9-3jrf9jf9',
			userInfo: {
				forename: 'Alex',
				surname: 'Dux',
				dateOfBirth: '17/12/1995'
			}
		}

		accountDataAccess.createAccount(inputUser)
			.then(() => {})
			.catch((err) => {
				assert(err === 'Email Address is required');
				done();
			});
	});

})