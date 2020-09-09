const newPresence = ((presenceData) => {
  const newActivity = require("./newActivity.js");

  const presence = {};

  presence.game = presenceData.game ? newActivity(presenceData.game) : null;
  presence.status = presenceData.status;
  presence.activities = presenceData.activities ? presenceData.activities.map((a) => newActivity(a)) : [];

  presence.clientStatus = ({
    desktop: !!presenceData.client_status.desktop,
    mobile: !!presenceData.client_status.mobile,
    web: !!presenceData.client_status.web
  });

  return presence;
});

module.exports = newPresence;
