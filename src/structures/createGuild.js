const createMember = require("./createMember.js");

const Collection = require("../utils/Collection.js");
const request = require("../utils/request.js");

const {cache} = require("../botProperties.js");

const createGuild = (async(guildData, token) => {
  const guild = {};
  const members = Collection(guildData.members.map((memberData) => createMember(memberData)), "id");

  guild.id = guildData.id;
  guild.name = guildData.name;

  guild.icon = guildData.icon; // hash
  guild.splash = guildData.splash; // hash
  guild.discoverySplash = guildData.discovery_splash; // hash

  if(guild.members.has(guildData.owner_id)) {
    guild.owner = members.get(guildData.owner_id);
  } else {
    const ownerMember = await request("GET", "/guilds/" + guild.id + "/members/" + guildData.owner_id, token);
  
    members.set(guildData.owner_id, ownerMember);
  
    guild.owner = guild.members.get(guildData.owner_id, ownerMember);
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
  guild.roles = guildData.roles; // roles structure
  guild.emojis = guildData.emojis; // emoji structure
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
    cache.channels.set(guildData.channels[i].id, guildData.channels[i]);
  }

  guild.presences = guildData.presences; // idk

  if(guildData.max_presences) {
    guild.maxPresences = guild.max_presences;
  }

  // max_members?, vanity_url_code, description, banner, premium_tier, premium_subscription_count?, preferred_locale, public_updates_channel_id?, max_video_channel_users?, approximate_member_count?, approximate_presence_count?

  guild.max_members

  if(guildData.vanity_url_code) {
    guild.vanityCode = guildData.vanity_url_code;
  }

  if(guildData.description) {
    guild.description = guildData.description;
  }

  if(guildData.banner) {
    guild.banner = guildData.banner; // hash
  }

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
