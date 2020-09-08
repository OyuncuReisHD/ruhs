const removeRole = (async (guildID, memberID, roleID) => {
  const request = require("../utils/request.js");

  return await request("DELETE", `/guilds/${guildID}/members/${memberID}/roles/${roleID}`);
});

module.exports = removeRole;
