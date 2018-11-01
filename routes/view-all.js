const router = require('express').Router();

router.get('/', (req, res) => {

    res.render('cvs/view-all');

})

module.exports = router;