const request = require("../utils/request.js");

module.exports = async function(channelID) {
  return await request("DELETE", "/channels/" + channelID);
}
