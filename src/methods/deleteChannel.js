const request = require("../utils/request.js");

module.exports = function(channelID) {
  request("DELETE", "/channels/" + channelID);
}
