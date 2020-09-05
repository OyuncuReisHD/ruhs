const request = require("../utils/request.js");

const deleteMessage = ((channelID, messageID) => {
  await request("DELETE", `/channels/${channelID}/messages/${messageID}`);
})

module.exports = deleteMessage;
