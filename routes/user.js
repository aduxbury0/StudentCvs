const router = require('express').Router();

router.get('/', (req, res) => {

    res.send('Account page');

});

router.get('/cv/create', (req, res) => {

    res.render('cvs/create');

});

router.get('/cv/edit', (req, res) => {
    
    res.render('cvs/edit');

});

router.get('/cv/:id', (req, res) => {

    res.render('cvs/view');
    
});

module.exports = router;