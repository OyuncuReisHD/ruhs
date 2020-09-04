const request = require("../utils/request.js");

module.exports = async function(channelID, messageID) {
	await request("PUT", "/channels/" + channelID + "/pins/" + messageID);
}
