const addChannel = (async (guildID, data) => {
  const isObject = require("../utils/isObject.js");
  const request = require("../utils/request.js");
  const createChannel = require("../structures/createChannel.js");


  if(typeof guildID !== "string") throw new TypeError("You must specify the guild's id to create a channel.");
  if(!isObject(data) || !data.name) throw new TypeError("You must specify the data of the channel to be created.");

  let channel;

  if(data.type === "category") {
    channel = await request("POST", `/guilds/${guildID}/channels`, {
      "name": data.name,
      "position": data.position,
      "permission_overwrites": data.permissionOverwrites,
      "type": 4
    });
  } else if(data.type === "voice") {
    channel = await request("POST", `/guilds/${guildID}/channels`, {
      "name": data.name,
      "type": 2,
      "bitrate": data.bitrate,
      "user_limit": data.userLimit,
      "position": data.position,
      "permission_overwrites": data.permissionOverwrites,
      "parent_id": data.parentID,

    });
  } else {
    channel = await request("POST", `/guilds/${guildID}/channels`, {
      "name": data.name,
      "type": 0,
      "topic": data.topic,
      "nsfw": data.nsfw,
      "rate_limit_per_user": data.rateLimitPerUser,
      "parent_id": data.parentID,
      "position": data.position,
      "permission_overwrites": data.permissionOverwrites
    });
  }

  return createChannel(channel);
});

module.exports = addChannel;
