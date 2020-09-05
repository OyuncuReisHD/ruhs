const request = require("../utils/request.js");

const createChannel = require("../structures/createChannel.js");

const addChannel = (async (guildID, data) => {
  let channel;

  if(data.type === "category") {
    channel = await request("POST", "/guilds/" + guildID + "/channels", {
      "name": data.name,
      "type": 4
    });
  } else if(data.type === "voice") {
    channel = await request("POST", "/guilds/" + guildID + "/channels", {
      "name": data.name,
      "type": 2,
      "parent_id": data.parent
    });
  } else if("text" === data.type) {
    channel = await request("POST", "/guilds/" + guildID + "/channels", {
      "name": data.name,
      "type": 0,
      "parent_id": data.parent,
      "topic": data.topic,
      "nsfw": data.nsfw || false
    });
  }

  return channelCreate(channel);
});

module.exports = createChannel;
