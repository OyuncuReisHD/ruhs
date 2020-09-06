const auditLog = (async(data, guildID) => {
  const {cache} = require("../botProperties.js");

  const Collection = require("../utils/Collection.js");
  const createAuditLog = require("./createAuditLog.js");



  const d = {};

  d.entries = Collection(data.audit_log_entries.map((channelData) => createAuditLog(channelData, guildID)), "id")

  return d;
});

module.exports = auditLog;
