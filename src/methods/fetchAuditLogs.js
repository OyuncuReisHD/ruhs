const fetchAuditLogs = (async (guildID, filter) => {
  const request = require("../utils/request.js");
  const axios = require("axios")
  const auditLog = require("../structures/auditLog.js");

  if (!filter) {
    var req = await request("GET", `/guilds/${guildID}/audit-logs`);
  } else {
    var req = await request("GET", `/guilds/${guildID}/audit-logs?${Object.keys(filter)[0]}=${Object.values(filter)[0]}${Object.keys(filter).length > 1 ? Object.keys(filter).map((f) => `&${f}=${filter[f]}`).join("") : ""}`);
  }
  return await auditLog(req);
});

module.exports = fetchAuditLogs;
