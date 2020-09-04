const WebSocket = require("ws");
const Axios = require("axios");

const {eventHandlers, cache, botInfo} = require("../botProperties.js");

const Collection = require("../utils/Collection.js");

const createGuild = require("../structures/createGuild.js");
const createMember = require("../structures/createMember.js");
const createMessage = require("../structures/createMessage.js");
const createVoiceState = require("../structures/createVoiceState.js");

let erlpack, zlib;
let wsObject = {};

const createSocket = (async (token, clientOptions) => {
  botInfo.token = token;

  const wsOptions = Object.assign({}, ({
    "version": 6,
    "encoding": "json",
    "compress": false
  }), (clientOptions.ws || {}));

  if(wsOptions.encoding === "etf") {
    try {
      erlpack = require("erlpack");
    } catch(error) {
      throw new Error("When 'encoding' websocket option is 'eft', 'erlpack' node package must be installed.");
    }
  }

  if (wsOptions.compress) {
    try {
      zlib = require("zlib-sync");
    } catch(error) {
      throw new Error("When 'compress' websocket option is true, 'zlib-sync' node package must be installed.");
    }
  }

  let gatewayURL = await Axios.get("https://discord.com/api/gateway");
  gatewayURL = gatewayURL.data.url;
  gatewayURL = gatewayURL + "/";

  let heartbeatInterval = 0;
  let lastSequence = null;

  wsObject.ws = new WebSocket(gatewayURL + "?" + ("v=" + wsOptions.version) + "&" + ("encoding=" + wsOptions.encoding) + (wsOptions.compress ? "&compress=zlib-stream" : ""));
  wsObject.pack = wsOptions.encoding === "etf" ? erlpack.pack : JSON.stringify;
  wsObject.unpack = wsOptions.encoding === "etf" ? ((data) => {
    return erlpack.unpack(Buffer.from(new Uint8Array(data)));
  }) : JSON.parse;

  let inflator;

  if(wsOptions.compress) {
    inflator = new zlib.Inflate({
      chunkSize: 65535,
      flush: zlib.Z_SYNC_FLUSH,
      to: wsOptions.encoding === "json" ? "string" : ""
    });
  }

  wsObject.ws.on("message", async (data) => {
    let wsData;

    if(wsOptions.compress) {
      const len = data.length;
      const flush = (len > 4) &&
        (data[len - 4] === 0x00) &&
        (data[len - 3] === 0x00) &&
        (data[len - 2] === 0xff) &&
        (data[len - 1] === 0xff);

      inflator.push(data, flush && zlib.Z_SYNC_FLUSH);

      if(!flush) return;

      wsData = wsObject.unpack(inflator.result);
    } else {
      wsData = wsObject.unpack(data);
    }

    if(wsData.op === 10) {
      heartbeatInterval = wsData.d.heartbeat_interval;

      setInterval(() => {
        wsObject.ws.send(wsObject.pack({
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

      if(clientOptions.intents && Array.isArray(clientOptions.intents) &&(clientOptions.intents.length !== 0)) {
        identifyData.d.intents = clientOptions.intents.map((intent) => Intents[intent]).reduce((bits, next) => bits | next, 0);
      } else if(clientOptions.intents === "ALL") {
        identifyData.d.intents = Object.values(Intents).reduce((bits, next) => bits | next, 0);
      }

      wsObject.ws.send(wsObject.pack(identifyData));
    } else if(wsData.op === 0) {
      if(eventHandlers.rawWS) {
        await eventHandlers.rawWS(wsData);
      }

      if(wsData.t === "READY") {
        cache.guilds = Collection(wsData.d.guilds, "id");
        botInfo.id = wsData.d.user.id;

        if(eventHandlers.ready) {
          await eventHandlers.ready();
        }
      } else if(wsData.t === "GUILD_CREATE") {
        if(cache.guilds.has(wsData.d.id)) {
          const guild = await createGuild(wsData.d);

          cache.guilds.set(wsData.d.id, guild);

          if(eventHandlers.guildCache) {
            await eventHandlers.guildCache(guild);
          }
        } else {
          const guild = await createGuild(wsData.d);

          cache.guilds.set(wsData.d.id, guild);

          if(eventHandlers.guildCreate) {
            await eventHandlers.guildCreate(guild);
          }
        }
      } else if(wsData.t === "GUILD_MEMBER_ADD") {
        const guild = cache.guilds.get(wsData.d.guild_id);
        const member = createMember(wsData.d);

        guild.members.set(wsData.d.user.id, member);

        guild.memberCount += 1;

        cache.guilds.set(wsData.d.guild_id, guild);

        if(eventHandlers.guildMemberAdd) {
          await eventHandlers.guildMemberAdd(member, guild);
        }
      } else if(wsData.t === "GUILD_MEMBER_REMOVE") {
        const guild = cache.guilds.get(wsData.d.guild_id);

        guild.members.delete(wsData.d.user.id);

        guild.memberCount -= 1;

        cache.guilds.set(wsData.d.guild_id, guild);

        if(eventHandlers.guildMemberRemove) {
          await eventHandlers.guildMemberRemove(member, guild);
        }
      } else if(wsData.t === "VOICE_STATE_UPDATE") {

        const data = await createVoiceState(wsData.d)

        if(eventHandlers.voiceStateUpdate) {
          await eventHandlers.voiceStateUpdate(data);
        }

      } else if(wsData.t === "MESSAGE_CREATE") {
        const message = await createMessage(wsData.d);

        if(eventHandlers.messageCreate) {
          await eventHandlers.messageCreate(message);
        }
      } else if(wsData.t === "MESSAGE_UPDATE") {
        const message = await createMessage(wsData.d);

        if(eventHandlers.messageUpdate) {
          await eventHandlers.messageUpdate(message);
        }
      } else if(wsData.t === "PRESENCE_UPDATE") {
        const member = await createPresence(wsData.d);

        if(eventHandlers.presenceUpdate) {
          await eventHandlers.presenceUpdate(member);
        }
      }

      lastSequence = wsData.s;
    }
  });

  wsObject.ws.on("error", console.log);
  wsObject.ws.on("close", console.log);
});

module.exports = {createSocket, wsObject};
