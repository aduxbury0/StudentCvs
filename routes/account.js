const router = require('express').Router();

router.get('/', (req, res) => {

    res.send('Account page');

});

router.get('/login', (req, res) => {

    res.send('login');
});

router.get('/register', (req, res) => {

    res.send('Register')

});

router.get('/logout', (req, res) => {

    res.send('logout');

});

module.exports = router;