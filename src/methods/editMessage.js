const editMessage = (async (channelID, messageID, data) => {
  const request = require("../utils/request.js");

  let message;

  if (typeof data !== "object") {
    message = await request("PATCH", `/channels/${channelID}/messages/${messageID}`, {
      "content": data
    });
  } else {
    message = await request("PATCH", `/channels/${channelID}/messages/${messageID}`, {
      "content": data.content || null,
      "embed": data.embed || null
    });
  }

  return message;
});

module.exports = editMessage;
