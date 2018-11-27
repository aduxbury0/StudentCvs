const router = require('express').Router();


router.get('/create', (req, res) => {

    res.render('cvs/create');

});

router.get('/edit', (req, res) => {
    
    res.render('cvs/edit');

});

router.get('/:id', (req, res) => {

    res.render('cvs/view');
    
});

router.get('/viewall', (req, res) => {

    res.render('cvs/view-all');

})

module.exports = router;