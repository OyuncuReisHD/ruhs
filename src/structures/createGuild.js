const createMember = require("./createMember.js");
const createRole = require("./createRole.js");
const createChannel = require("./createChannel.js");

const Collection = require("../utils/Collection.js");
const request = require("../utils/request.js");

const {cache} = require("../botProperties.js");

const createGuild = (async(guildData, token) => {
  const guild = {};
  const members = Collection(guildData.members.map((memberData) => createMember(memberData)), "id");

  guild.id = guildData.id;
  guild.name = guildData.name;

  guild.getIcon = (() => {
    if(guildData.icon && guildData.icon.startsWith("a_")) {
      return "https://cdn.discordapp.com/icons/" + guild.id + "/" + guildData.icon.slice(2) + ".gif";
    } else if(guildData.icon) {
      return "https://cdn.discordapp.com/icons/" + guild.id + "/" + guildData.icon + ".png";
    } else {
      return null;
    }
  });

  guild.getSplash = (() => {
    if(guildData.splash) {
      return "https://cdn.discordapp.com/splashes/" + guild.id + "/" + guildData.splash + ".png";
    } else {
      return null;
    }
  });

  guild.getDiscoverySplash = (() => {
    if(guildData.discovery_splash) {
      return "https://cdn.discordapp.com/discovery-splashes/" + guild.id + "/" + guildData.discovery_splash + ".png";
    } else {
      return null;
    }
  });

  if(members.has(guildData.owner_id)) {
    guild.owner = members.get(guildData.owner_id);
  } else {
    const ownerMember = await request("GET", "/guilds/" + guild.id + "/members/" + guildData.owner_id);
  
    members.set(guildData.owner_id, ownerMember);
  
    guild.owner = members.get(guildData.owner_id, ownerMember);
  }

  // permissions

  guild.region = guildData.region;

  if(guildData.afk_channel_id) {
    guild.afkChannelID = guildData.afk_channel_id;
  }

  guild.afkTimeout = guildData.afk_timeout;
  guild.verificationLevel = guildData.verification_level;
  guild.defaultMessageNotifications = guildData.default_message_notifications;
  guild.explicitContentFilter = guildData.explicit_content_filter;
  guild.roles = Collection(guildData.roles.map((roleData) => createRole(roleData)), "owner_id");
  guild.emojis = Collection(guildData.emojis.map((emojiData) => createEmoji(emojiData)), "owner_id");
  guild.features = guildData.features;
  guild.mfaLevel = guildData.mfa_level;
  guild.widgetEnabled = !!guildData.widget_enabled;

  if(guild.widgetEnabled) {
    guild.widgetChannelID = guildData.widget_channel_id
  }

  guild.systemChannelID = guildData.system_channel_id;
  // system_channel_flags

  if(guildData.rules_channel_id) {
    guild.rulesChannelID = guildData.rules_channel_id;
  }

  guild.joinedAt = new Date(guildData.joined_at);
  guild.large = !!guildData.large;

  guild.memberCount = guildData.member_count;
  guild.voiceStates = guildData.voice_states; // voiceState structure
  guild.members = members;

  guild.channels = guildData.channels.map((channel) => channel.id);

  for(let i = 0; i < guildData.channels.length; i++) {
    cache.channels.set(guildData.channels[i].id, createChannel(guildData.channels[i]));
  }

  guild.presences = guildData.presences; // presence structure

  if(guildData.max_presences) {
    guild.maxPresences = guild.max_presences;
  }

  if(guildData.max_members) {
    guild.maxMembers = guildData.max_members;
  }

  if(guildData.vanity_url_code) {
    guild.vanityCode = guildData.vanity_url_code;
  }

  if(guildData.description) {
    guild.description = guildData.description;
  }

  guild.getBanner = (() => {
    if(guildData.banner) {
      return "https://cdn.discordapp.com/banners/" + guild.id + "/" + guildData.banner + ".png";
    } else {
      return null;
    }
  });

  guild.premiumTier = guildData.premium_tier;

  if(guildData.premium_subscription_count) {
    guild.premiumSubscriptionCount = guildData.premium_subscription_count;
  }

  guild.preferredLocale = guildData.preferred_locale;

  if(guildData.public_updates_channel_id) {
    guild.publicUpdatesChannelID = guildData.public_updates_channel_id;
  }

  if(guildData.max_video_channel_users) {
    guild.maxVideoChannelUsers = guildData.max_video_channel_users;
  }

  return guild;
});

module.exports = createGuild;
