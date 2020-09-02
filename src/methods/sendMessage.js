const request = require("../utils/request.js");

const createMessage = require("../structures/createMessage.js");

const sendMessage = (async (channelID, data) => {
  const message = await request("POST", "/channels/" + channelID + "/messages", {
    content: (typeof data === "string") ? data : (data.content || null),
    embed: data.embed || null,
    tts: data.tts || false
  });

  return await createMessage(message);
});

module.exports = sendMessage;
