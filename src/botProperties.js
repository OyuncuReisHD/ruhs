const Collection = require("./utils/Collection.js");

const cache = ({
  "guilds": Collection(),
  "channels": Collection()
});

const botInfo = ({
  "id": "",
  "token": ""
});

const eventHandlers = ({});

module.exports = ({
  botInfo,
  cache,
  eventHandlers
});
