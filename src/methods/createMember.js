const createUser = require("./createUser.js");

const createMember = ((memberData) => {
  const member = {};

  member.id = memberData.user.id;
  member.user = createUser(memberData.user);
  member.nick = memberData.nick;
  member.roles = memberData.roles;
  member.joinedAt = memberData.joined_at ? new Date(memberData.joined_at) : undefined;
  member.premiumSince = memberData.premium_since ? new Date(memberData.premium_since) : undefined;
  member.deaf = memberData.deaf;
  member.mute = memberData.mute;

  return memberData;
});

module.exports = createMember;
