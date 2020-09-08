const { botInfo } = require("../botProperties.js");

const deleteReaction = (async (messageID, channelID, emoji, userID = botInfo.id) => {
  const request = require("../utils/request.js");

  let emojiEncoded = emoji;

  if (emoji === decodeURI(emoji)) {
    emojiEncoded = encodeURIComponent(emoji);
  }

  if (userID !== botInfo.id) {
    await request("DELETE", `/channels/${channelID}/messages/${messageID}/reactions/${emojiEncoded}/${userID}`);
  } else {
    await request("DELETE", `/channels/${channelID}/messages/${messageID}/reactions/${emojiEncoded}/@me`);
  }
});

module.exports = deleteReaction;
