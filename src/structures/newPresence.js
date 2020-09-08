const newPresence = ((presenceData) => {
  const newActivity = require("./newActivity.js");
  const { cache } = require("../botProperties.js");

  const presence = {};

  presence.roles = presenceData.roles;
  presence.game = presenceData.game ? newActivity(presenceData.game) : null;
  presence.guildID = presenceData.guild_id;
  presence.status = presenceData.status;
  presence.activities = presenceData.activities.map((a) => newActivity(a));

  presence.clientStatus = ({
    desktop: !!presenceData.client_status.desktop,
    mobile: !!presenceData.client_status.mobile,
    web: !!presenceData.client_status.web
  });

  if (presenceData.guild_id) {
    presence.member = cache.guilds.get(presenceData.guild_id).members.get(presenceData.user.id);
  }

  return presence;
});

module.exports = newPresence;
