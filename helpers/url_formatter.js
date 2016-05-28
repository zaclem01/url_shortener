module.exports = function urlFormatter(url) {
	if (!url.match(/^https|http/)) {
		return 'http://' + url;
	} else {
		return url;
	}
}