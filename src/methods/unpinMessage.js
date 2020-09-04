const request = require("../utils/request.js");

module.exports = function(channelID, messageID) {
  request("DELETE", "/channels/" + channelID + "/pins/" + messageID);
}
