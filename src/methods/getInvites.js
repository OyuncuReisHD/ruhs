const request = require("../utils/request.js");
const createInvites = require("../structures/createInvites.js");

const getInvites = (async (guildID) => {
  const req = await request("GET", `/guilds/${guildID}/invites`);
  return await createInvites(req, guildID);
});

module.exports = getInvites;