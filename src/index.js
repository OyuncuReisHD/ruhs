const { cache, eventHandlers, botInfo } = require("./botProperties.js");


const Collection = require("./utils/Collection.js");
const Embed = require("./utils/Embed.js");
const request = require("./utils/request.js");


const createChannel = require("./methods/createChannel.js");
const deleteChannel = require("./methods/deleteChannel.js");

const createRole = require("./methods/createRole.js");
const deleteRole = require("./methods/deleteRole.js");

const createReaction = require("./methods/createReaction.js");
const deleteReaction = require("./methods/deleteReaction.js");

const getInvites = require("./methods/getInvites.js");

const deleteMessage = require("./methods/deleteMessage.js");
const editMessage = require("./methods/editMessage.js");
const getPinnedMessages = require("./methods/getPinnedMessages.js");
const sendMessage = require("./methods/sendMessage.js");
const pinMessage = require("./methods/pinMessage.js");
const unpinMessage = require("./methods/unpinMessage.js");

const createClient = require("./methods/createClient.js");
const setPresence = require("./methods/setPresence.js");

const addWebhook = require("./methods/addWebhook.js");
const deleteWebhook = require("./methods/deleteWebhook.js");
const sendWithWebhook = require("./methods/sendWithWebhook.js");

// const fetchAuditLogs = require("./methods/fetchAuditLogs.js");


module.exports = ({
  cache,
  eventHandlers,
  botInfo,


  Collection,
  Embed,
  request,


  createChannel,
  deleteChannel,

  createRole,
  deleteRole,

  createReaction,
  deleteReaction,

  getInvites,

  deleteMessage,
  editMessage,
  getPinnedMessages,
  sendMessage,
  pinMessage,
  unpinMessage,

  createClient,
  setPresence,

  addWebhook,
  deleteWebhook,
  sendWithWebhook
});
