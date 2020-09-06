const createVoiceState = (async (voiceStateData) => {
  const {cache} = require("../botProperties.js");
  const request = require("../utils/request.js");
  const createMember = require("./createMember.js");

  const voiceState = {};

  voiceState.channel = cache.channels.get(voiceStateData.channel_id);

  if(voiceStateData.guild_id) {
    voiceState.guild = cache.guilds.get(voiceStateData.guild_id);
  }
  
  if(voiceStateData.member) {
    d.member = createMember(voiceStateData.member);
  } else {
    const user = await request("GET", `/users/${voiceStateData.user_id}`)
    d.user = createUser(user);
  }

  voiceState.sessionID = voiceStateData.session_id;
  voiceState.selfMute = voiceStateData.self_mute
  voiceState.selfDeaf = voiceStateData.self_deaf
  voiceState.mute = voiceStateData.mute
  voiceState.deaf = voiceStateData.deaf
  voiceState.channelID = voiceStateData.channel_id

  return voiceState;
});

module.exports = createVoiceState;
