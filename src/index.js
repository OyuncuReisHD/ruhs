const createClient = require("./methods/createClient.js");
const {cache, eventHandlers} = require("./botProperties.js");

module.exports = ({
  createClient,
  eventHandlers,
  cache
});
