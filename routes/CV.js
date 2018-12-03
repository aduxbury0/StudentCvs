const router = require('express').Router();
const cvLogic = require('../modules/businessLogic/cvLogic');


router.get('/create', (req, res) => {

	res.render('cvs/create');

});

router.get('/edit', (req, res) => {
    
	res.render('cvs/edit');

});

router.post('/edit', (req, res) => {
	console.log(req);
	cvLogic.editCV(req)
		.then((newCV) => {


		})
		.catch(err => console.log(err))
	res.sendStatus(200);

});

router.get('/:id', (req, res) => {

	res.render('cvs/view');
    
});

router.get('/viewall', (req, res) => {

	res.render('cvs/view-all');

})

module.exports = router;