const deleteMessage = (async (channelID, messageID) => {
  const request = require("../utils/request.js");

  if (typeof channelID !== "string") throw new TypeError("You must specify the channel's id to delete a message.");
  if (typeof messageID !== "string") throw new TypeError("You must specify the message's id to delete a message.");

  await request("DELETE", `/channels/${channelID}/messages/${messageID}`);
})

module.exports = deleteMessage;
