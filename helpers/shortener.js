var randGen = require('random-seed')

module.exports = function shortener(url) {
	return randGen.create(url).intBetween(1000, 10000);
}