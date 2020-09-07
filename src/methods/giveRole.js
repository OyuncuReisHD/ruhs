const request = require("../utils/request.js");

const giveRole = (async (guildID, memberID, roleID) => {

    return await request("PUT", `/guilds/${guildID}/members/${memberID}/roles/${roleID}`);

});

module.exports = giveRole;
