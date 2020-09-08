const newReaction = ((reactionData) => {
  const newEmoji = require("./newEmoji.js");

  const reaction = {};

  reaction.emoji = newEmoji(reactionData.emoji);
  reaction.count = reactionData.count;
  reaction.me = reactionData.me;

  return reaction;
});

module.exports = newReaction;
