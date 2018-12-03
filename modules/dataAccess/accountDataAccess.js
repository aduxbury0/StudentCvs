const User = require('../../Schemas/User');

const accountAccess = {
	singleAccount(username) {
		return new Promise(async (resolve, reject) => {
			try{
				const foundUser = await User.findOne(username)
				if(foundUser !== {}) {
					resolve(foundUser);
				}
				else {
					reject('user not found');
				}
			}
			catch(err) {
				reject(err);
			}
		});
	},

	createAccount(newAccount) {
		return new Promise((resolve, reject) => {
            
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
				})

		});
	}

}

module.exports = accountAccess;


