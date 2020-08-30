const createUser = require("./createUser.js");

const createMember = ((data) => {
  const memberData = {};

  memberData.user = createUser(data.user);
  memberData.nick = data.nick;
  memberData.roles = data.roles;
  memberData.joinedAt = data.joined_at ? new Date(data.joined_at) : undefined;
  memberData.premiumSince = data.premium_since ? new Date(data.premium_since) : undefined;
  memberData.deaf = data.deaf;
  memberData.mute = data.mute;

  return memberData;
});

module.exports = createMember;
