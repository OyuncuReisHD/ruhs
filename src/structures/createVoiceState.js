const {cache} = require("../botProperties.js");

const request = require("../utils/request.js");

const createMember = require("./createMember.js");
const createChannel = require("./createChannel.js");

const createVoiceState = (async(data) => {
  
  const d = {};

  if(!cache.channels.has(data.channel_id)) {
    const channelData = await request("GET", "/channels/" + data.channel_id);
    cache.channels.set(data.channel_id, createChannel(channelData));
  }

  d.channel = cache.channels.get(data.channel_id);

  if(data.guild_id) {
    d.guild = cache.guilds.get(data.guild_id);
  }

  d.member = (() => {
    if(data.member) {
      return createMember(Object.assign({}, data.member, {
        user: d.member.user
      }));
    } else {
      return null;
    }
  });

  d.sessionID = data.session_id;
  d.selfMute = data.self_mute
  d.selfDeaf = data.self_deaf
  d.mute = data.mute
  d.deaf = data.deaf
  d.channelID = data.channel_id


  return d;
});

module.exports = createVoiceState;
