const Collection = require("../utils/Collection.js");
const request = require("../utils/request.js");
const createMember = require("./createMember.js");
const {cache} = require("../botProperties.js");

const createGuild = (async(guildData, token) => {
  const guild = {};

  guild.id = guildData.id;
  guild.name= guildData.name;
  guild.members = Collection(guildData.members.map((memberData) => createMember(memberData)), "id");
  guild.memberCount = guildData.member_count;

  if(guild.members.has(guildData.owner_id)) {
    guild.owner = guild.members.get(guildData.owner_id);
  } else {
    const ownerMember = await request("GET", "/guilds/" + guild.id + "/members/" + guildData.owner_id, token);

    guild.members.set(guildData.owner_id, ownerMember);

    guild.owner = guild.members.get(guildData.owner_id, ownerMember);
  }

  guild.channels = guildData.channels.map((channel) => channel.id);

  for(let i = 0; i < guildData.channels.length; i++) {
    cache.channels.set(guildData.channels[i].id, guildData.channels[i]);
  }
  return guild;
});

module.exports = createGuild;
