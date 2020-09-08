const newMember = ((memberData) => {
  const newUser = require("./newUser.js");

  const member = {};

  member.id = memberData.user.id;
  member.user = newUser(memberData.user);
  member.nick = memberData.nick || null;
  member.roles = memberData.roles;
  member.joinedAt = new Date(memberData.joined_at);

  if (memberData.premium_since) {
    member.premiumSince = new Date(memberData.premium_since);
  }

  member.deaf = !!memberData.deaf;
  member.mute = !!memberData.mute;

  return member;
});

module.exports = newMember;
