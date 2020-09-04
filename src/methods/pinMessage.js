const request = require("../utils/request.js");

module.exports = function(channelID, messageID) {
  request("PUT", "/channels/" + channelID + "/pins/" + messageID);
}
