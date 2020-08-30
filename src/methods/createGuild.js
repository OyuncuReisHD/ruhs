const Collection = require("../utils/Collection.js");
const createMember = require("./createMember.js");

const createGuild = ((data) => {
  const guildData = {};

  guildData.owner = createMember(data.members.find((memberData) => memberData.user.id === data.owner_id));
  guildData.channels = Collection(data.channels);
  guildData.members = Collection(data.members.map((memberData) => createMember(memberData)));

  return guildData;
});

module.exports = createGuild;
