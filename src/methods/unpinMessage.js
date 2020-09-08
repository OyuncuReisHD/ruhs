const unpinMessage = (async (channelID, messageID) => {
  const request = require("../utils/request.js");

  await request("DELETE", "/channels/" + channelID + "/pins/" + messageID);
});

module.exports = unpinMessage;
