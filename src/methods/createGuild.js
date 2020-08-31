const Collection = require("../utils/Collection.js");
const createMember = require("./createMember.js");
const {cache} = require("../botProperties.js");

const createGuild = ((data) => {
  const guildData = {};

  // guildData.owner = createMember(data.members.find((memberData) => memberData.user.id === data.owner_id));
  guildData.channels = data.channels.map((channel) => channel.id);

  for(let i = 0; i < data.channels.length; i++) {
    cache.channels.set(data.channels[i].id, data.channels[i]);
  }

  guildData.members = Collection(data.members.map((memberData) => createMember(memberData)));

  return guildData;
});

module.exports = createGuild;
