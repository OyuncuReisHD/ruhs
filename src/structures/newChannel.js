const newChannel = ((channelData) => {
  const newUser = require("./newUser.js");

  const channel = {};
  const types = ["text", "dm", "voice", "group_dm", "category", "news", "guild_store"];

  channel.id = channelData.id;
  channel.type = types[channelData.type];

  if (channelData.guild_id) {
    channel.guildID = channelData.guild_id;
  }

  if (channel.type !== "dm") {
    channel.position = channelData.position;
    channel.positionOverwrites = channelData.permission_overwrites; // overwrite structure
    channel.name = channelData.name;
    channel.topic = channelData.topic || null;
    channel.nsfw = channelData.nsfw;
    channel.lastMessageID = channelData.last_message_id || null;
  }

  if (channel.type === "voice") {
    if (channelData.bitrate) {
      channel.bitrate = channelData.bitrate;
    }

    if (channelData.user_limit) {
      channel.userLimit = channelData.user_limit;
    }
  } else if (channelData.rate_limit_per_user) {
    channel.rateLimitPerUser = channelData.rate_limit_per_user;
  }

  if (channel.type === "dm") {
    channel.recipients = channelData.recipients.map((recipient) => newUser(recipient));
  } else {
    channel.parentID = channelData.parent_id || null;
  }

  return channel;
});

module.exports = newChannel;
