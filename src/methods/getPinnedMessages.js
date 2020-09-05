const request = require("../utils/request.js");
const Collection = require("../utils/Collection.js");

const getPinnedMessages = (async (channelID) => {
  const pinnedMessagesResult = await request("PUT", `/channels/${channelID}/pins`);
  const pinnedMessages = Collection(pinnedMessagesResult, "id");

  return pinnedMessages;
});

module.exports = getPinnedMessages;
