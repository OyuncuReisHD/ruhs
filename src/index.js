const createClient = require("./methods/createClient.js");
const {cache, eventHandlers} = require("./botProperties.js");
const sendMessage = require("./methods/sendMessage.js");

module.exports = ({
  createClient,
  eventHandlers,
  cache,
  sendMessage
});
