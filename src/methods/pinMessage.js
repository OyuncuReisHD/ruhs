const pinMessage = (async (channelID, messageID) => {
  const getPinnedMessages = require("./getPinnedMessages.js");
  const request = require("../utils/request.js");

  const pinnedMessages = await getPinnedMessages(channelID);

  if (pinnedMessages.size() < 50) {
    await request("PUT", `/channels/${channelID}/pins/${messageID}`);
  } else {
    throw new Error("The max pinned messages is 50. I can't pin a message without unpin a message.");
  }
});

module.exports = pinMessage;
