const createReaction = ((reactionData) => {
  const createEmoji = require("./createEmoji.js");

  const reaction = {};

  reaction.count = reactionData.count;
  reaction.me = reactionData.me;
  reaction.emoji = createEmoji(reactionData.emoji);

  return reaction;
});

module.exports = createReaction;
