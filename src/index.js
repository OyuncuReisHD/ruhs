const {cache, eventHandlers, botInfo} = require("./botProperties.js");

const Collection = require("./utils/Collection.js");
const request = require("./utils/request.js");

const createClient = require("./methods/createClient.js");
const sendMessage = require("./methods/sendMessage.js");
const setPresence = require("./methods/setPresence.js");

module.exports = ({
  createClient,
  eventHandlers,
  cache,
  sendMessage,
  botInfo,
  setPresence,
  Collection,
  request
});
