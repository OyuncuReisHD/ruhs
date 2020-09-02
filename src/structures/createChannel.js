const createUser = require("./createUser");

const createChannel = ((channelData) => {
  const channel = {};
  const types = ["text", "dm", "voice", "group_dm", "category", "news", "guild_store"];

  channel.id = channelData.id;
  channel.type = types[channelData.type];

  if(!["dm", "group_dm"].includes(channel.type)) {
    channel.position = channelData.position;
    channel.positionOverwrites = channelData.permission_overwrites; // overwrite structure
    channel.name = channelData.name;
    channel.topic = channelData.topic || null;
    channel.nsfw = channelData.nsfw;
    // last_message_id
  }

  if(channel.type === "voice") {
    if(channelData.bitrate) {
      channel.bitrate = channelData.bitrate;
    }

    if(channelData.user_limit) {
      channel.userLimit = channelData.user_limit;
    }
  } else if(channelData.rate_limit_per_user) {
    channel.rateLimitPerUser = channelData.rate_limit_per_user;
  }

  if(["dm", "group_dm"].includes(channel.type)) {
    channel.recipients = channelData.recipients.map((recipient) => createUser(recipient));
    channel.icon = channelData.icon || null; // hash
    channel.ownerID = channelData.owner_id;
  } else {
    channel.parentID = channelData.parent_id || null;
  }

  return channel;
});

module.exports = createChannel;
