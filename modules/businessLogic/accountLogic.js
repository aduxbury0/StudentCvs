const bcrypt = require('bcrypt');
const accountAccess = require('../dataAccess/accountDataAccess');
const jwt = require('jsonwebtoken');
const keys = require('../../keys/keys');

module.exports = {


	register(req) {
		return new Promise((resolve, reject) => {
			const body = req.body;

			const emailEnding = body.emailAddress.substring((body.emailAddress.length-6),(body.emailAddress.length))
			if(emailEnding !== '.ac.uk') {
				reject('Email must be a UK academic email address');
			}

			let hashedPassword = '';
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(body.password, salt, (err, hash) => {
					
					hashedPassword = hash;
                
					const newUser = {
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
							resolve(createdUser);
						})
						.catch(err => reject(err));
				});
			});           
		});
	},

	login(req) {
		return new Promise((resolve, reject) => {
			const body = req.body
			accountAccess.singleAccount(body.username)
				.then((foundUser) => {
					bcrypt.compare(body.password, foundUser.password, (err, isMatch) => {
						if(isMatch) {
							const token = jwt.sign(foundUser.toJSON(), keys.jwtSecret, {
								expiresIn: '24h'
							});
							resolve(token);
						}
						else{
							reject('Incorrect Username or Password')
						}
	
					});
				})
				.catch(err => reject(err));
		});
	},


	addCVtoAccount(cookie, cvId) {
		return new Promise((resolve, reject) => {
			jwt.verify(cookie, keys.jwtSecret, (err, decoded) => {
				if (err) reject('error decoding cookie');
				else {
					accountAccess.addCVtoAccount(decoded.username, cvId)
						.then((response) => resolve(response))
						.catch(err => reject(err));
				}
			});	
		});
	}
}