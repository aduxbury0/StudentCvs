module.exports = {

    createAccount(newAccount) {
        return new Promise((resolve, reject) => {
            if(newAccount) {
                resolve(newAccount);
            }
            else {
                reject('No account');
            }
        });
    }


}