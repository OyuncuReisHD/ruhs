const request = require("../utils/request.js");

const sendMessage = (async (channelID, data) => {
  const msg = await request("POST", "/channels/" + channelID + "/messages", "NzQ5OTQwMjEzNjUyMTI3ODU1.X0zSQA.GMGQdD8KCTrrdfV9WhlG4E1DYGE", {
    content: (typeof data === "string") ? data : (data.content || null),
    embed: data.embed || null,
    tts: data.tts || false
  });

  return msg;
});

module.exports = sendMessage;