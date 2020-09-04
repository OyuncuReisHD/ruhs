const createEmoji = require("./createEmoji.js");

const createActivity = ((activityData) => {
  const presenceTypes = ({
    0: "playing",
    1: "streaming",
    2: "listening",
    4: "custom"
  });
  const activity = {};
  
  activity.name = activityData.name;
  activity.type = presenceTypes[activityData.type];
  
  if (activityData.url) {
    activity.url = activityData.url;
  }

  activity.createdAt = new Date(activityData.created_at);
  activity.timestamps = activityData.timestamps;
  activity.details = activityData.details || null;
  activity.state = activityData.state || null;
  activity.emoji = activityData.emoji ? createEmoji(activityData.emoji) : null;
  if (activityData.asset) {
    activity.assets = {
      largeImage: activityData.assets.hasOwnProperty("large_image") ? activityData.assets.large_image : null,
      largeText: activityData.assets.hasOwnProperty("large_text") ? activityData.assets.large_text : null,
      smallImage: activityData.assets.hasOwnProperty("small_image") ? activityData.assets.small_image : null,
      smallText: activityData.assets.hasOwnProperty("small_text") ? activityData.assets.small_text : null
    };
  }

  return activity;
});

module.exports = createActivity;
