const request = require("../utils/request.js");

const channelCreate = require("../structures/createChannel.js");

const createChannel = (async (guildID, data) => {
    if([4, "category"].includes(data.type)) {
        var channel = await request("POST", "/guilds/" + guildID + "/channels", {
            name: data.name,
            type: 4,
        });
    } else if([2, "voice"].includes(data.type)) {
        var channel = await request("POST", "/guilds/" + guildID + "/channels", {
            name: data.name,
            type: 2,
            parent_id: data.parent,
        });
    } else if([0, "text"].includes(data.type)) {
        var channel = await request("POST", "/guilds/" + guildID + "/channels", {
            name: data.name,
            type: 0,
            parent_id: data.parent,
            topic: data.topic,
            nsfw: data.nsfw || false
        });
    } else {
        var channel = await request("POST", "/guilds/" + guildID + "/channels", {
            name: data.name,
            type: 0,
            parent_id: data.parent,
            topic: data.topic,
            nsfw: data.nsfw || false
        });
    }

  return channelCreate(channel);
});

module.exports = createChannel;
