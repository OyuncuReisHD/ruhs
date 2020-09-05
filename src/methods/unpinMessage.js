const request = require("../utils/request.js");

module.exports = async function(channelID, messageID) {
  return await request("DELETE", "/channels/" + channelID + "/pins/" + messageID);
}
