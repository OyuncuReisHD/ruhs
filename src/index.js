require("./structures/auditLog.js");
require("./structures/createActivity.js");
require("./structures/createAuditLog.js");
require("./structures/createChannel.js");
require("./structures/createEmoji.js");
require("./structures/createGuild.js");
require("./structures/createMember.js");
require("./structures/createMessage.js");
require("./structures/createPresence.js");
require("./structures/createRole.js");
require("./structures/createUser.js");
require("./structures/createVoiceState.js");

const {cache, eventHandlers, botInfo} = require("./botProperties.js");

const Collection = require("./utils/Collection.js");
const Embed = require("./utils/Embed.js");
const request = require("./utils/request.js");

const addChannel = require("./methods/addChannel.js");
const createClient = require("./methods/createClient.js");
const deleteChannel = require("./methods/deleteChannel.js");
const deleteMessage = require("./methods/deleteMessage.js");
const editMessage = require("./methods/editMessage.js");
// const fetchAuditLogs = require("./methods/fetchAuditLogs.js");
const getPing = require("./methods/getPing.js");
const getPinnedMessages = require("./methods/getPinnedMessages.js");
const pinMessage = require("./methods/pinMessage.js");
const sendMessage = require("./methods/sendMessage.js");
const setPresence = require("./methods/setPresence.js");
const unpinMessage = require("./methods/unpinMessage.js");

module.exports = ({
  cache,
  eventHandlers,
  botInfo,

  Collection,
  Embed,
  request,

  addChannel,
  createClient,
  deleteChannel,
  deleteMessage,
  editMessage,
  getPing,
  getPinnedMessages,
  pinMessage,
  sendMessage,
  setPresence,
  unpinMessage
});
