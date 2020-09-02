const {wsObject} = require("./createSocket.js");

const setPresence = ((presenceData) => {
  const presenceTypes = ({
    "playing": 0,
    "streaming": 1,
    "listening": 2
  });

  const presence = {};

  if(presenceData.game) {
    presence.game = {};
    presence.game.name = presenceData.game.name;
    presence.game.type = presenceTypes[presenceData.game.type];

    if(presenceData.game.url) {
      presence.game.url = presenceData.game.url;
    }
  } else {
    presenceData.game = null;
  }

  presence.status = presenceData.status || "online";
  presence.afk = presenceData.afk || false;
  presence.since = Date.now();

  wsObject.ws.send(wsObject.pack({
    "op": 3,
    "d": presence
  }));
});

module.exports = setPresence;