const Collection = require("./utils/Collection.js");

const cache = ({
  "guilds": new Collection(),
  "channels": new Collection()
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
