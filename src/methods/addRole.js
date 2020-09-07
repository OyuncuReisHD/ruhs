const addRole = (async(guildID, roleData = {}) => {
  const isObject = require("../utils/isObject.js");
  const request = require("../utils/request.js");
  const createRole = require("../structures/createRole.js");


  if(typeof guildID !== "string") throw new TypeError("You must specify the guild's id to create a role.");
	if(!isObject(roleData)) throw new Error("You must specify the data of the role to be created.");

  const role = await request("POST", `/guilds/${guildID}/roles`, {
		"name": roleData.name,
		"permissions": roleData.permissions,
		"color": roleData.color,
		"hoist": roleData.hoist,
		"mentionable": roleData.mentionable
	});

	return createRole(role);
});

module.exports = addRole;