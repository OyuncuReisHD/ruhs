const request = require("../utils/request.js");

const createMessage = require("../structures/createMessage.js");

const sendMessage = (async (channelID, data) => {
  let message;

  if(typeof data === "object") {
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

  return await createMessage(message);
});

module.exports = sendMessage;
