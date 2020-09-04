const request = require("../utils/request.js");

module.exports = async function(channelID) {
	await request("DELETE", "/channels/" + channelID);
}
