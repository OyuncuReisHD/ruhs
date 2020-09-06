const createActivity = ((activityData) => {
  const createEmoji = require("./createEmoji.js");

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
    activity.url = activityData.url || null;
  }

  activity.createdAt = new Date(activityData.created_at);

  if(activityData.timestamps) {
    activity.timestamps = activityData.timestamps;
  }

  if(activityData.details) {
    activity.details = activityData.details || null;
  }

  if(activityData.state) {
    activity.state = activityData.state || null;
  }

  if(activityData.emoji) {
    activity.emoji = createEmoji(activityData.emoji) || null;
  }

  if (activityData.assets) {
    activity.assets = ({
      "largeImage": activityData.assets.large_image || null,
      "largeText": activityData.assets.large_text || null,
      "smallImage": activityData.assets.small_image || null,
      "smallText": activityData.assets.small_text || null
    });
  }

  return activity;
});

module.exports = createActivity;
