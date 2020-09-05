const request = require("../utils/request.js");
const axios = require("axios")
const auditLog = require("../structures/auditLog.js");

const fetchAuditLogs = (async (guildID) => {

    const req = await request("GET", "/guilds/"+guildID+"/audit-logs");
    return await auditLog(req, guildID);
});

module.exports = fetchAuditLogs;
