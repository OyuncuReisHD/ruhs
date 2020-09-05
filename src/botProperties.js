const Collection = require("./utils/Collection.js");

const cache = ({
  "guilds": Collection(),
  "channels": Collection()
});

const botInfo = ({
  "id": "",
  "token": "",
  "pings": []
});

const eventHandlers = ({});

module.exports = ({
  botInfo,
  cache,
  eventHandlers
});
