const User = require('../../Schemas/User');

const accountAccess = {
	singleAccount(username) {
		return new Promise((resolve, reject) => {

			User.findOne({username: username})
				.then((foundUser) => {
					if(foundUser === {} || typeof foundUser === 'undefined' || foundUser === null) {
						reject('user not found');
					}
					else {
						resolve(foundUser);
					}

				})
				.catch(err => reject('Registration Database error'));
		});
	},

	createAccount(newAccount) {
		return new Promise((resolve, reject) => {

			if(typeof newAccount.username === 'undefined' || newAccount.username === '') {
				reject('Username is required');
			}
			else if(typeof newAccount.password === 'undefined' || newAccount.password === '') {
				reject('Password is required');
			}
			else if(typeof newAccount.userInfo.forename === 'undefined' || newAccount.userInfo.forename === '') {
				reject('Forename is required');
			}
			else if(typeof newAccount.userInfo.surname === 'undefined' || newAccount.userInfo.surname === '') {
				reject('Surname is required');
			}
			else if(typeof newAccount.userInfo.dateOfBirth === 'undefined' || newAccount.userInfo.dateOfBirth === '') {
				reject('Date of Birth is required');
			}
			else if(typeof newAccount.userInfo.emailAddress === 'undefined' || newAccount.userInfo.emailAddress === '') {
				reject('Email Address is required');
			}
			else {
				const user = new User({
					username: newAccount.username,
					password: newAccount.password,
					userInfo: {
						forename: newAccount.userInfo.forename,
						surname: newAccount.userInfo.surname,
						dateOfBirth: newAccount.userInfo.dateOfBirth,
						emailAddress: newAccount.userInfo.emailAddress
					}});
	
				user.save()
					.then((newUser) => {
						resolve(newUser);
					})
					.catch(err => {
						reject(err);
					});
			}
		});
	}

}

module.exports = accountAccess;


