const Collection = require("./utils/Collection.js");

const cache = ({
  "guilds": Collection(),
  "channels": Collection()
});

const botInfo = ({
  "id": "",
  "token": "",
  "pings": [],
  "ping": 0
});

const eventHandlers = ({});

module.exports = ({
  botInfo,
  cache,
  eventHandlers
});
