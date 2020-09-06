const WebSocket = require("ws");
const Axios = require("axios");

const {eventHandlers, cache, botInfo} = require("../botProperties.js");

const Collection = require("../utils/Collection.js");

const createGuild = require("../structures/createGuild.js");
const createMember = require("../structures/createMember.js");
const createMessage = require("../structures/createMessage.js");
const createPresence = require("../structures/createPresence.js");
const createChannel = require("../structures/createChannel.js");
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
  let lastHeartbeat = null;

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
      lastHeartbeat = Date.now();
      wsObject.ws.send(wsObject.pack({
        "op": 1,
        "d": lastSequence
      }));

      setInterval(() => {
        lastHeartbeat = Date.now();

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

      const Intents = ({
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
      });

      if(clientOptions.intents && Array.isArray(clientOptions.intents) &&(clientOptions.intents.length !== 0)) {
        identifyData.d.intents = clientOptions.intents.map((intent) => Intents[intent]).reduce((bits, next) => bits | next, 0);
      } else if(clientOptions.intents === "ALL") {
        identifyData.d.intents = Object.values(Intents).reduce((bits, next) => bits | next, 0);
      }

      wsObject.ws.send(wsObject.pack(identifyData));
    } else if(wsData.op === 11) {
      botInfo.pings.unshift(Date.now() - lastHeartbeat);

      if(botInfo.pings.length > 3) {
        botInfo.pings.length = 3;
      }
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
        const member = createMember(guild.members.get(wsData.d.user.id));

        guild.members.filter((user) => user.user.id !== wsData.d.user.id)
        guild.memberCount -= 1;
        cache.guilds.set(wsData.d.guild_id, guild);

        if(eventHandlers.guildMemberRemove) {
          await eventHandlers.guildMemberRemove(member, guild);
        }

        const fetchAuditLogs = require("./fetchAuditLogs.js");
        const log = await fetchAuditLogs(guild.id, {limit:1}).then(x => x.entries.entries()[0][1]);
        if(log.action === "MEMBER_KICK" && log.target.id === wsData.d.user.id) {
          if(eventHandlers.kickMember) {
            await eventHandlers.kickMember(member, guild);
          }
        }

        if(log.action === "MEMBER_BAN_ADD" && log.target.id === wsData.d.user.id) {
          if(eventHandlers.banMember) {
            await eventHandlers.banMember(member, guild);
          }
        }

      } else if(wsData.t === "VOICE_STATE_UPDATE") {
        if(eventHandlers.voiceStateUpdate) {
          const voiceState = await createVoiceState(wsData.d);

          await eventHandlers.voiceStateUpdate(voiceState);
        }
      } else if(wsData.t === "MESSAGE_CREATE") {
        if(eventHandlers.messageCreate) {
          const message = await createMessage(wsData.d);

          await eventHandlers.messageCreate(message);
        }
      } else if(wsData.t === "MESSAGE_UPDATE") {
        if(eventHandlers.messageUpdate) {
          const message = await createMessage(wsData.d);

          await eventHandlers.messageUpdate(message);
        }
      } else if(wsData.t === "PRESENCE_UPDATE") {
        if(eventHandlers.presenceUpdate) {
          const presence = await createPresence(wsData.d);

          await eventHandlers.presenceUpdate(presence);
        }
      } else if(wsData.t === "CHANNEL_CREATE") {
        const channel = await createChannel(wsData.d);

        if(wsData.d.guild_id) {
          const guild = cache.guilds.get(wsData.d.guild_id);

          guild.channels.push(wsData.d.id);

          cache.guilds.set(wsData.d.guild_id, guild);
        }

        cache.channels.set(channel.id, channel);

        if(eventHandlers.channelCreate) {
          await eventHandlers.channelCreate(channel);
        }
      } else if(wsData.t === "CHANNEL_UPDATE") {
        const newChannel = await createChannel(wsData.d);
        const oldChannel = cache.channels.get(wsData.d.id);

        cache.channels.set(newChannel.id, newChannel);

        if(eventHandlers.channelUpdate) {
          await eventHandlers.channelUpdate(oldChannel, newChannel)
        }
      } else if(wsData.t === "GUILD_MEMBER_UPDATE") {
        const guild = cache.guilds.get(wsData.d.guild_id);
        const newMember = createMember(wsData.d);
        const oldMember = guild.members.get(wsData.d.user.id);

        guild.members.set(wsData.d.user.id, newMember);

        if(eventHandlers.memberUpdate) {
          await eventHandlers.memberUpdate(oldMember, newMember)
        }
      }

      lastSequence = wsData.s;
    }
  });

  wsObject.ws.on("error", console.log);
  wsObject.ws.on("close", console.log);
});

module.exports = {createSocket, wsObject};
