const createClient = require("./methods/createClient.js");
const {ping} = require("./methods/createSocket.js");
const {cache, eventHandlers} = require("./botProperties.js");

module.exports = ({
  createClient,
  ping,
  eventHandlers,
  cache
});
