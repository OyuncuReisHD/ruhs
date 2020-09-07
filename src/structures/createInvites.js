const createInvite = require("./createInvite.js");
const Collection = require("../utils/Collection.js");

const createInvites = ((inviteData, guildID) => {
  const invites = [];

  Collection(inviteData.map((channelData) => invites.push(createInvite(inviteData, guildID))), "id")

  return invites;
});

module.exports = createInvites;
