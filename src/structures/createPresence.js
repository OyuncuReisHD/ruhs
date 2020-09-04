const createUser = require("./createUser.js");
const {cache} = require("../botProperties.js");

const createPresence = (async (presenceData) => {
  const presence = {};

  presence.user = createUser(presenceData.user);
  presence.roles = presenceData.roles;

  const game = createActivity(presenceData.game);
  presence.game = game;

  presence.guild = cache.guilds.get(presenceData.guild_id);
  presence.status = presenceData.status;

  const activities = presenceData.activities.map((a) => createActivity(a));
  presence.activities = activities;

  presence.clientStatus = ({
    desktop: !!presenceData.client_status.desktop,
    mobile: !!presenceData.client_status.mobile,
    web: !!presenceData.client_status.web
  });

  presence.premiumSince = presenceData.premium_since || null;
  presence.nick = presenceData.nick || null;

  return presence;
});

module.exports = createPresence;