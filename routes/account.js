const accountLogic = require('../modules/businessLogic/accountLogic');

const router = require('express').Router();

router.get('/', (req, res) => {

	res.send('Account page');

});

/* Login Routes */
router.get('/login', (req, res) => {

	res.render('login');
});

router.post('/login', (req, res) => {
	accountLogic.login(req)
		.then((token) => {
			res.send(200, token);
		})
		.catch(err => console.log(err));

});

/* Registration Routes */
router.get('/register', (req, res) => {

	res.render('signup');

});

router.post('/register', (req, res) => {

	accountLogic.register(req)
		.then(() => {
			res.sendStatus(201);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});	
});

module.exports = router;