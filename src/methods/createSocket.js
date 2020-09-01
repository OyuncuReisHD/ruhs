const WebSocket = require("ws");
const Axios = require("axios");

const {eventHandlers, cache} = require("../botProperties.js");
const Collection = require("../utils/Collection.js");

const createGuild = require("./createGuild.js");
const createMember = require("./createMember.js");

let erlpack, zlib;
let ping = 0;

const createSocket = (async (token, clientOptions) => {
  const options = Object.assign({}, ({
    "version": 6,
    "encoding": "json",
    "compress": false
  }), (clientOptions.ws || {}));

  if(options.encoding === "etf") {
    try {
      erlpack = require("erlpack");
    } catch(error) {
      throw new Error("When 'encoding' websocket option is 'eft', 'erlpack' node package must be installed.");
    }
  }

  if (options.compress) {
    try {
      zlib = require("zlib-sync");
    } catch(error) {
      throw new Error("When 'compress' websocket option is true, 'zlib-sync' node package must be installed.");
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

  let inflator;

  if(options.compress) {
    inflator = new zlib.Inflate({
      chunkSize: 65535,
      flush: zlib.Z_SYNC_FLUSH,
      to: options.encoding === "json" ? "string" : ""
    });
  }

  ws.on("message", async (data) => {
    let wsData;

    if(options.compress) {
      const len = data.length;
      const flush = (len > 4) &&
        (data[len - 4] === 0x00) &&
        (data[len - 3] === 0x00) &&
        (data[len - 2] === 0xff) &&
        (data[len - 1] === 0xff);

      inflator.push(data, flush && zlib.Z_SYNC_FLUSH);

      if(!flush) return;

      wsData = unpack(inflator.result);
    } else {
      wsData = unpack(data);
    }

    if(wsData.op === 10) {
      heartbeatInterval = wsData.d.heartbeat_interval;

      setInterval(() => {
        ws.send(pack({
          "op": 1,
          "d": lastSequence
        }));
      }, heartbeatInterval);

      const identifyData = {
        "op": 2,
        "d": {
          "token": token,
          "properties": {
            "$os": process.platorm,
            "$browser": "ruhs",
            "$device": "ruhs"
          }
        }
      };

      const Intents = {
        "GUILDS": 1 << 0,
        "GUILD_MEMBERS": 1 << 1,
        "GUILD_BANS": 1 << 2,
        "GUILD_EMOJIS": 1 << 3,
        "GUILD_INTEGRATIONS": 1 << 4,
        "GUILD_WEBHOOKS": 1 << 5,
        "GUILD_INVITES": 1 << 6,
        "GUILD_VOICE_STATES": 1 << 7,
        "GUILD_PRESENCES": 1 << 8,
        "GUILD_MESSAGES": 1 << 9,
        "GUILD_MESSAGE_REACTIONS": 1 << 10,
        "GUILD_MESSAGE_TYPING": 1 << 11,
        "DIRECT_MESSAGES": 1 << 12,
        "DIRECT_MESSAGE_REACTIONS": 1 << 13,
        "DIRECT_MESSAGE_TYPING": 1 << 14
      };

      if(clientOptions.intents && (clientOptions.intents.length !== 0)) {
        identifyData.d.intents = clientOptions.intents.map((intent) => Intents[intent]).reduce((bits, next) => bits | next, 0);
      }

      ws.send(pack(identifyData));
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
        const guild = await createGuild(wsData.d, token);

        cache.guilds.set(wsData.d.id, guild);

        if(eventHandlers.guildCreate) {
          eventHandlers.guildCreate(guild);
        }
      } else if(wsData.t === "GUILD_MEMBER_ADD") {
        const guild = cache.guilds.get(wsData.d.guild_id);
        const member = createMember(wsData.d);

        guild.members.set(wsData.d.user.id, guild);

        guild.memberCount += 1;

        cache.guilds.set(wsData.d.guild_id, member);

        if(eventHandlers.guildMemberAdd) {
          eventHandlers.guildMemberAdd(member, guild);
        }
      }

      lastSequence = wsData.s;
    }
  });
});

module.exports = {createSocket, ping};
