const mongoose = require('mongoose');
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

    createAccount() {
        return new Promise((resolve, reject) => {


        });
    }

}

module.exports = accountAccess;