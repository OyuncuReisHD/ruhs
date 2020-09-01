const createUser = require("./createUser.js");

const createMember = ((memberData) => {
  const member = {};

  member.id = memberData.user.id;
  member.user = createUser(memberData.user);
  member.nick = memberData.nick || null;
  member.roles = memberData.roles;
  member.joinedAt = new Date(memberData.joined_at);

  if(memberData.premium_since) {
    member.premiumSince = new Date(memberData.premium_since);
  }

  member.deaf = memberData.deaf;
  member.mute = memberData.mute;

  return memberData;
});

module.exports = createMember;
