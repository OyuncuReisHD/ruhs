const request = require("../utils/request.js");

const deleteRole = ((guildID, roleID) => {
	request("DELETE", `/guilds/${guildID}/roles/${roleID}`);
});

module.exports = deleteRole;