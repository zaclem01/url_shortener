var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
	full_url: String,
	shortened_url: String
});

module.exports = mongoose.model('Url', UrlSchema)