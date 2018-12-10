const router = require('express').Router();

router.get('/', (req, res) => {

	res.send('Account page');

});

/* Login Routes */
router.get('/login', (req, res) => {

	res.render('login');
});

router.post('/login', (req, res) => {

	res.send(201);

});

/* Registration Routes */
router.get('/register', (req, res) => {

	res.render('signup');

});

router.post('/register', (req, res) => {

	res.send(201);
	
});

/* Logout Routes */
router.get('/logout', (req, res) => {

	res.send('logout');

});

router.post('/logout', (req, res) => {

	res.send(201);
	
});

module.exports = router;