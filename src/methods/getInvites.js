const getInvites = (async (guildID) => {
  const request = require("../utils/request.js");
  const Collection = require("../utils/Collection.js");
  const createInvite = require("../structures/createInvite.js");

  const invites = await request("GET", `/guilds/${guildID}/invites`);

  return new Collection(invites.map((inviteData) => createInvite(inviteData, guildID)), "code");
});

module.exports = getInvites;
