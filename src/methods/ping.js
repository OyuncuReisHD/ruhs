const { botInfo } = require("../botProperties.js");

module.exports = function() {
	return botInfo.pings.reduce((acc, curr) => acc + curr) / botInfo.pings.length;
}
