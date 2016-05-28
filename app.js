var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 8080;
var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/url_shortener';

if (dbUrl === 'mongodb://localhost:27017/url_shortener') {
	console.log('connected to localhost')
} else {
	console.log('connected to mLab')
}

mongoose.connect(dbUrl, (err) => {
	if (err) {
		console.error('connection error:', err);
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