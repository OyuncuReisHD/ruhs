const deleteMessage = (async (channelID, messageID) => {
  const request = require("../utils/request.js");


  await request("DELETE", `/channels/${channelID}/messages/${messageID}`);
})

module.exports = deleteMessage;
