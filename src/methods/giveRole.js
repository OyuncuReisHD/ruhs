const giveRole = (async (guildID, memberID, roleID) => {
  const request = require("../utils/request.js");

  return await request("PUT", `/guilds/${guildID}/members/${memberID}/roles/${roleID}`);
});

module.exports = giveRole;
