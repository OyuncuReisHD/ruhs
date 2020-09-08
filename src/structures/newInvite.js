const newInvite = ((inviteData) => {
  const { cache } = require("../botProperties.js");
  const newMember = require("./newUser.js");

  const invite = {};

  invite.code = inviteData.code;

  if (invite.guild) {
    invite.guild = cache.guilds.get(inviteData.guild.id);
  }

  if (invite.inviter) {
    invite.inviter = newMember(inviteData.inviter);
  }

  invite.channel = cache.channels.get(inviteData.channel.id);

  invite.uses = inviteData.uses;
  invite.maxUses = inviteData.max_uses;
  invite.maxAge = inviteData.max_age;
  invite.temporary = inviteData.temporary;
  invite.createdAt = new Date(inviteData.created_at);

  return invite;
});

module.exports = newInvite;
