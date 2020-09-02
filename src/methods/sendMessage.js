const request = require("../utils/request.js");

const sendMessage = (async (channelID, data) => {
  const msg = await request("POST", "/channels/" + channelID + "/messages", "a", {
    content: (typeof data === "string") ? data : (data.content || null),
    embed: data.embed || null,
    tts: data.tts || false
  });

  return msg;
});

module.exports = sendMessage;
