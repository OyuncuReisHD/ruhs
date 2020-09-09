const assingMemberUser = ((userData) => {
  const memberData = userData.member;
  delete userData.member;

  return Object.assign(memberData, ({
    "user": userData
  }));
});

const newMessage = (async (messageData) => {
  const { cache } = require("../botProperties.js");
  const Collection = require("../utils/Collection.js");
  const request = require("../utils/request.js");
  const newUser = require("./newUser.js");
  const newMember = require("./newMember.js");
  const newRole = require("./newRole.js");
  const newChannel = require("./newChannel.js");
  const newReaction = require("./newReaction.js");

  const types = ["DEFAULT", "RECIPIENT_ADD", "RECIPIENT_REMOVE", "CALL",
    "CHANNEL_NAME_CHANGE", "CHANNEL_ICON_CHANGE", "CHANNEL_PINNED_MESSAGE",
    "GUILD_MEMBER_JOIN", "USER_PREMIUM_GUILD_SUBSCRIPTION", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3", "CHANNEL_FOLLOW_ADD", "GUILD_DISCOVERY_DISQUALIFIED", "GUILD_DISCOVERY_REQUALIFIED"];

  const message = {};

  if (!cache.channels.has(messageData.channel_id)) {
    const channelData = await request("GET", `/channels/${messageData.channel_id}`);
    cache.channels.set(messageData.channel_id, newChannel(channelData));
  }

  message.id = messageData.id;

  message.channel = cache.channels.get(messageData.channel_id);

  if (messageData.guild_id) {
    message.guild = cache.guilds.get(messageData.guild_id);
  }

  message.author = newUser(messageData.author);

  message.member = (() => {
    if (messageData.member) {
      return newMember(Object.assign({}, messageData.member, {
        user: messageData.author
      }));
    } else {
      return null;
    }
  });

  if (message.member() && message.guild && !message.guild.members.has(message.member().id)) {
    const member = message.member();
    message.guild.members.set(member.id, member);
  }

  message.content = messageData.content;
  message.newdAt = new Date(messageData.timestamp);
  message.edited = !!messageData.edited_timestamp;

  if (message.edited) {
    message.editedAt = new Date(messageData.edited_timestamp);
  }

  message.tts = messageData.tts;
  message.mentionedEveryone = messageData.mention_everyone;

  if (messageData.mentions) {
    message.mentions = new Collection(messageData.mentions.map((mentionData) => mentionData.member ? newMember(assingMemberUser(mentionData)) : newUser(mentionData)), "id");
  }

  if (messageData.mention_roles) {
    message.rolesMentions = new Collection(messageData.mention_roles.map((roleData) => newRole(roleData)), "id");
  }

  if (messageData.mention_channels) {
    message.channelsMentions = new Collection(messageData.mention_channels.map((channelData) => newChannel(channelData)), "id");
  }

  message.attachments = messageData.attachments; // attachment structure
  message.embeds = messageData.embeds;

  if (messageData.reactions) {
    message.reactions = messageData.reactions.map((reactionData) => newReaction(reactionData));
  }

  if (message.nonce) {
    message.nonce = messageData.nonce;
  }

  message.pinned = messageData.pinned;

  if (messageData.webhook_id) {
    message.webhookID = messageData.webhook_id;
  }

  message.type = types[messageData.type];

  return message;
});

module.exports = newMessage;
