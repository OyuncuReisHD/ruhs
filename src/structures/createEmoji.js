const createEmoji = ((emojiData) => {
  const emoji = {};

  emoji.id = emojiData.id || null;
  emoji.name = emojiData.name || null;

  if(emojiData.roles) {
    emoji.roles = emojiData.roles;
  }

  if(emojiData.user) {
    emoji.user = createUser(emojiData.user);
  }

  if(emojiData.require_colons) {
    emoji.requireColons = emojiData.require_colons;
  }

  if(emojiData.managed) {
    emoji.managed = emojiData.managed;
  }

  if(emojiData.animated) {
    emoji.animated = emojiData.animated;
  }

  if(emojiData.available) {
    emoji.available = emojiData.available;
  }

  return emoji;
});

module.exports = createEmoji;
