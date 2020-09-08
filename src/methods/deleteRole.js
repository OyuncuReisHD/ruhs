const deleteRole = (async (guildID, roleID) => {
  const request = require("../utils/request.js");

  if (typeof guildID !== "string") throw new TypeError("You must specify the guild's id to delete a role.");
  if (typeof roleID !== "string") throw new TypeError("You must specify the role's id to delete a role.");

  await request("DELETE", `/guilds/${guildID}/roles/${roleID}`);
});

module.exports = deleteRole;