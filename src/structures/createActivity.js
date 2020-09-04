const createEmoji = require("./createEmoji.js");

const createActivity = (async (activityData) => {
  const presenceTypes = ({
    0: "playing",
    1: "streaming",
    2: "listening"
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
  activity.assets = {
    largeImage: activityData.assets.large_image,
    largeText: activityData.assets.large_text,
    smallImage: activityData.assets.small_image,
    smallText: activityData.assets.small_text
  };

  return activity;
});

module.exports = createActivity;