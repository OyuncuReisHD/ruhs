const createInvite = ((inviteData) => {
  const {cache} = require("../botProperties.js");
  const request = require("../utils/request.js")
  const createUser = require("./createUser.js");

  const invite = {};

  invite.code = inviteData.code;

  if(invite.guild) {
    invite.guild = cache.guilds.get(inviteData.guild.id);
  }

  if(invite.inviter) {
    invite.inviter = createUser(inviteData.inviter);
  }

  invite.channel = cache.channels.get(inviteData.channel.id);

  invite.uses = inviteData.uses;
  invite.maxUses = inviteData.max_uses;
  invite.maxAge = inviteData.max_age;
  invite.temporary = inviteData.temporary;
  invite.createdAt = new Date(inviteData.created_at);

  return invite;
});

module.exports = createInvite;
