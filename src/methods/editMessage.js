const request = require("../utils/request.js");

const editMessage = (async (channelID, messageID, data) => {
  if(typeof data !== "object") {
    var message = await request("PATCH", "/channels/" + channelID + "/messages/" + messageID, {
      content: data 
    });
  } else {
    var message = await request("PATCH", "/channels/" + channelID + "/messages/" + messageID, {
      content: data.content || null,
      embed: data.embed || null
    });
  }

  return message;
});

module.exports = editMessage;
