const request = require("../utils/request.js");

const unpinMessage = (async (channelID, messageID) => {
  await request("DELETE", "/channels/" + channelID + "/pins/" + messageID);
});

module.exports = unpinMessage;