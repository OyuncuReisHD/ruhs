const Collection = require("./utils/Collection.js");

const cache = ({
  "guilds": Collection(),
  "channels": Collection()
});

const eventHandlers = ({});

module.exports = ({
  cache,
  eventHandlers
});
