const auditLog = (async (data, guildID) => {
  const Collection = require("../utils/Collection.js");
  const createAuditLog = require("./createAuditLog.js");

  const d = {};

  d.entries = new Collection(data.audit_log_entries.map((channelData) => createAuditLog(channelData, guildID)), "id")

  return d;
});

module.exports = auditLog;
