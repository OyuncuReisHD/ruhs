const request = require("../utils/request.js");
const createRole = require("../structures/createRole.js");

const addRole = (async(guildID, roleData) => {
	const role = await request("POST", `/guilds/${guildID}/roles`, {
		name: roleData.name || null,
		permissions: roleData.permissions || null,
		color: roleData.color || null,
		hoist: roleData.hoist || null,
		mentionable: roleData.mentionable || null
	});
	return createRole(role);
});

module.exports = addRole;