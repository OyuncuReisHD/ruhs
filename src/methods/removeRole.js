const request = require("../utils/request.js");

const removeRole = (async (guildID, memberID, roleID) => {

    return await request("DELETE", `/guilds/${guildID}/members/${memberID}/roles/${roleID}`);

});

module.exports = removeRole;
