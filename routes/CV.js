const router = require('express').Router();
const cvLogic = require('../modules/businessLogic/cvLogic');


router.get('/create', (req, res) => {

	res.render('cvs/create');

});

router.post('/create', (req, res) => {

	cvLogic.createCV(req)
	.then((newCv) => {
		res.redirect(`/cv/${newCV._id}`);

	})
	.catch(err => console.log(err));
})

router.get('/edit', (req, res) => {
    
	res.render('cvs/edit');

});

router.post('/edit', (req, res) => {
	cvLogic.editCV(req)
		.then(newCV => {


		})
		.catch(err => console.log(err))
	res.sendStatus(200);

});

router.get('/viewall', (req, res) => {
	
	cvLogic.cvList()
	.then((cvs) => {
		res.render('cvs/view-all', {cvList: cvs});
	})
	.catch(err => console.log(err));
	
})

router.get('/:id', (req, res) => {

	res.render('cvs/view');
    
});

module.exports = router;