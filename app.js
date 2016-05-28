var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/url_shortener', (err) => {
	if (err) {
		console.log('connection error:', err);
	} else {
		console.log('successfully connected to db');
	}
})

app.set('view engine', 'pug');
app.use(express.static('public/'))
app.use(require('./controllers'));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});