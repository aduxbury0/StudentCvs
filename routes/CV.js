const router = require('express').Router();
const cvLogic = require('../modules/businessLogic/cvLogic');
const jwt = require('jsonwebtoken');
const keys = require('../keys/keys');
const accountLogic = require('../modules/businessLogic/accountLogic');


router.get('/create', (req, res) => {

	if(req.cookies.scvAuth !== 'undefined') {
		jwt.verify(req.cookies.scvAuth, keys.jwtSecret, (err) => {
			if(err) res.redirect('/account/login');
			else {
				res.render('cvs/create');
			}
		})
	}
});

router.post('/create', (req, res) => {

	if(req.cookies.scvAuth !== 'undefined') {
		jwt.verify(req.cookies.scvAuth, keys.jwtSecret, (err) => {
			if(err) res.redirect('/account/login');
			else {
				cvLogic.createCV(req)
					.then((newCv) => {
						accountLogic.addCVtoAccount(req.cookies.scvAuth, newCv._id)
							.then(() => {
								res.send(201, newCv)
							})
							.catch(err => console.log(err));
					})
					.catch(err => console.log(err));
			}
		});
	}

	
})

router.get('/edit', (req, res) => {
	if(req.cookies.scvAuth !== 'undefined') {
		jwt.verify(req.cookies.scvAuth, keys.jwtSecret, (err, decoded) => {
			if(err) res.redirect('/account/login');
			else {
				const fakereq = {
					params: {
						id: decoded.cv
					}
				}
				cvLogic.singleCv(fakereq)
					.then((foundCv) => {
						res.render('cvs/edit', {cv: foundCv});
					})
					.catch(err => console.log(err));
				
			}
		});
	}
	else{
		console.log('No Cookie');
	}
});

router.post('/edit', (req, res) => {
	jwt.verify(req.cookies.scvAuth, keys.jwtSecret, (err) => {
		if(err) res.redirect('/account/login');
		else {
			cvLogic.editCV(req)
				.then(newCv => {
					res.send(200, newCv);
				})
				.catch(err => console.log(err));
		}
	});
});

router.get('/viewall', (req, res) => {
	
	cvLogic.cvList()
		.then((cvs) => {
			res.render('cvs/view-all', {cvList: cvs});
		})
		.catch(err => console.log(err));
	
})

router.get('/:id', (req, res) => {
	cvLogic.singleCv(req)
		.then((foundCV) => {
			res.render('cvs/view', {cv: foundCV});
		})
		.catch(err => console.log(err));
});

module.exports = router;