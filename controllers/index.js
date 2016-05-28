var express = require('express');
var	router = express.Router();

router.use('/urls', require('./urls'));

router.get('/', (req, res) => {
	res.render('../views/index.pug');
});

module.exports = router;