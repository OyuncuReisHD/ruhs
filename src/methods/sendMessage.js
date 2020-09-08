const sendMessage = (async (channelID, data) => {
  const request = require("../utils/request.js");
  const newMessage = require("../structures/newMessage.js");

  let message;

  if (typeof data === "object") {
    message = await request("POST", "/channels/" + channelID + "/messages", {
      "content": data.content,
      "embed": data.embed || null,
      "tts": data.tts || false
    });
  } else {
    message = await request("POST", "/channels/" + channelID + "/messages", {
      "content": data
    });
  }

  return await newMessage(message);
});

module.exports = sendMessage;
