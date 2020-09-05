const createActivity = require("./createActivity.js");

const {cache} = require("../botProperties.js");

const createPresence = ((presenceData) => {
  const presence = {};
  
  presence.roles = presenceData.roles;
  presence.game = presenceData.game ? createActivity(presenceData.game) : null;
  presence.guildID = presenceData.guild_id;
  presence.status = presenceData.status;
  presence.activities = presenceData.activities.map((a) => createActivity(a));

  presence.clientStatus = ({
    desktop: !!presenceData.client_status.desktop,
    mobile: !!presenceData.client_status.mobile,
    web: !!presenceData.client_status.web
  });

  presence.member = cache.guilds.get(presenceData.guild_id).members.get(presenceData.user.id);

  return presence;
});

module.exports = createPresence;
