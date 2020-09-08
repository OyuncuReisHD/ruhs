const createReaction = (async (messageID, channelID, emoji) => {
  const request = require("../utils/request.js");
  const newMessage = require("../structures/newMessage.js");
  const newEmoji = require("../structures/newEmoji.js");

  let emojiEncoded = emoji;

  if (emoji === decodeURI(emoji)) {
    emojiEncoded = encodeURIComponent(emoji);
  }

  await request("PUT", `/channels/${channelID}/messages/${messageID}/reactions/${emojiEncoded}/@me`);

  const messageData = await request("GET", `/channels/${channelID}/messages/${messageID}`);
  const message = await newMessage(messageData);

  return message.reactions.find((reaction) => reaction.emoji.name === emoji);
});

module.exports = createReaction;
