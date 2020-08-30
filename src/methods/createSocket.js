const WebSocket = require("ws");
const Axios = require("axios");

const {eventHandlers, cache, setBotUser} = require("../botProperties.js");
const Collection = require("../utils/Collection.js");

const createGuild = require("./createGuild.js");

let erlpack;
let ping = 0;

const createSocket = (async (token, wsOptions) => {
  const options = Object.assign({}, ({
    "version": 6,
    "encoding": "json",
    "compress": false
  }), wsOptions);

  if(options.encoding === "etf") {
    try {
      erlpack = require("erlpack");
    } catch(error) {
      throw new Error("When 'encoding' websocket option is 'eft', 'erlpack' node package must be installed.");
    }
  }

  let gatewayURL = await Axios.get("https://discord.com/api/gateway");
  gatewayURL = gatewayURL.data.url;
  gatewayURL = gatewayURL.endsWith("/") ? gatewayURL : (gatewayURL + "/");

  let heartbeatInterval = 0;
  let lastSequence = null;
  let lastPingLatency = null;

  const ws = new WebSocket(gatewayURL + "?" + ("v=" + options.version) + "&" + ("encoding=" + options.encoding) + (options.compress ? "&compress=zlib-stream" : ""));
  const pack = options.encoding === "etf" ? erlpack.pack : JSON.stringify;
  const unpack = options.encoding === "etf" ? ((data) => {
    return erlpack.unpack(Buffer.from(new Uint8Array(data)));
  }) : JSON.parse;

  ws.on("message", async (data) => {
    let wsData = unpack(data);

    if(wsData.op === 10) {
      hearbeatInterval = wsData.hearbeat_interval;

      setInterval(() => {
        ws.send(pack({
          "op": 1,
          "d": lastSequence
        }));
      }, heartbeatInterval);

      ws.send(pack({
        "op": 2,
        "d": {
          "token": token,
          "properties": {
            "$os": "win32",
            "$browser": "ruhs",
            "$device": "ruhs"
          }
        }
      }));
    } else if(wsData.op === 0) {
      if(eventHandlers.rawWS) {
        await eventHandlers.rawWS(wsData);
      }

      if(wsData.t === "READY") {
        cache.guilds = Collection(wsData.d.guilds, "id");

        if(eventHandlers.ready) {
          eventHandlers.ready();
        }
      } else if(wsData.t === "GUILD_CREATE") {
        cache.guilds.set(wsData.d.id, createGuild(wsData.d));
      }
    }
  });
});

module.exports = {createSocket, ping};
