var express = require('express');
var	router = express.Router();
var url = require('url');
var validator = require('validator');

var	Url = require('../models/url');
var shortener = require('../helpers/shortener');
var urlFormatter = require('../helpers/url_formatter');

router.get('/', (req, res) => {
	Url.find(
		{}, 
		{'_id': 0, 'full_url': 1, 'shortened_url': 1})
		.limit(10)
		.exec((err, urls) => {
			if (err) {
				res.send(`There was an error. Error: ${err}`);
			} else {
				res.render('urls/urls.pug', {urls: urls});
			}
		});
});

router.get('/:short_url', (req, res) => {
	var shortUrl = req.params.short_url;
	console.log('shortUrl ' , shortUrl);
	findShortUrl(shortUrl, (err, url) => {
		var redirectUrl = urlFormatter(url.full_url);
		if (err)
			return console.error('Error finding url:', err);
		if (url) {
			res.redirect(redirectUrl)
		} else {
			res.send('That short url does not exist')
		}
	});
});

router.get('/new/*', (req, res) => {
	var reqUrl = req.params[0];
	if (validator.isURL(reqUrl)) {
		findFullUrl(reqUrl, (err, url) => {
			if (err) 
				return console.error('Error finding url:', err);
			if (!url) {
			
				saveUrl(reqUrl, (err, short) => {
					if (err)
						return console.error('Error saving url:', err);
					res.json(short);
				})
			} else {
				res.send(`${reqUrl} has already been created as ${url}`);
			}
		});
	} else {
		res.json({error: 'Please use a valid URL'});
	}
});

function findFullUrl(url, callback) {
	Url.findOne(
		{full_url: url},
		{'_id': 0, 'full_url':1, 'shortened_url': 1},
		(err, urls) => {
			if (err) return callback(err);
			callback(null, urls);
		}
	);
}

function findShortUrl(url, callback) {
	Url.findOne(
		{shortened_url: url},
		{'_id': 0, 'full_url':1, 'shortened_url': 1},
		(err, urls) => {
			if (err) return callback(err);
			callback(null, urls);
		}
	);
}

function saveUrl(url, callback) {
	shortened_url = shortener(url);
	Url.create({
		full_url: url,
		shortened_url
	}, (err, short) => {
		if (err) return callback(err);
		callback(null, short);
	});
}

module.exports = router;