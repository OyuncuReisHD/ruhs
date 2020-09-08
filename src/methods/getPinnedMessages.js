const getPinnedMessages = (async (channelID) => {
  const request = require("../utils/request.js");
  const Collection = require("../utils/Collection.js");

  const pinnedMessagesResult = await request("GET", `/channels/${channelID}/pins`);
  const pinnedMessages = Collection(pinnedMessagesResult, "id");

  return pinnedMessages;
});

module.exports = getPinnedMessages;
