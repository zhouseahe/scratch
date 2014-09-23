var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user', function(req, res) {
    res.render('user/share', { title: 'something to say' });
});

module.exports = router;
