const {cache} = require("../botProperties.js");

const request = require("../utils/request.js");

const createMember = require("./createMember.js");
const createVoiceState = (async(data) => {
  
  const d = {};

  d.channel = cache.channels.get(data.channel_id);

  if(data.guild_id) {
    d.guild = cache.guilds.get(data.guild_id);
  }
  
  if(data.member) {
    d.member = createMember(data.member);
  } else {
    const user = await request("GET", "/users/" + data.user_id)
    d.user = createUser(user);
  }

  d.sessionID = data.session_id;
  d.selfMute = data.self_mute
  d.selfDeaf = data.self_deaf
  d.mute = data.mute
  d.deaf = data.deaf
  d.channelID = data.channel_id

  return d;
  
});

module.exports = createVoiceState;
