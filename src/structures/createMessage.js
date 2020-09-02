const {cache} = require("../botProperties.js");

const Collection = require("../utils/Collection.js");
const request = require("../utils/request.js");

const createUser = require("./createUser.js");
const createMember = require("./createMember.js");
const createRole = require("./createRole.js");
const createChannel = require("./createChannel.js");

const assingMemberUser = ((userData) => {
  const memberData = userData.member;
  delete userData.member;

  return Object.assign(memberData, ({
    "user": userData
  }));
});

const createMessage = (async(messageData) => {
  const message = {};

  if(!cache.channels.has(messageData.channel_id)) {
    const channelData = await request("GET", "/channels/" + messageData.channel_id);
    cache.channels.set(messageData.channel_id, createChannel(channelData));
  }

  message.id = messageData.id;

  message.channel = (() => {
    return cache.channels.get(messageData.channel_id);
  });

  if(messageData.guild_id) {
    message.guild = (() => {
      return cache.guilds.get(messageData.guild_id);
    });
  }

  message.author = createUser(messageData.author);

  message.member = (() => {
    if(messageData.member) {
      return createMember(memberData);
    } else {
      return null;
    }
  });

  message.content = messageData.content;
  message.createdAt = new Date(messageData.timestamp);
  message.edited = !!messageData.edited_timestamp;

  if(message.edited) {
    message.editedAt = new Date(messageData.edited_timestamp);
  }

  message.tts = messageData.tts;
  message.mentionedEveryone = messageData.mention_everyone;
  message.mentions = Collection(messageData.mentions.map((mentionData) => mentionData.member ? createMember(assingMemberUser(mentionData)) : createUser(mentionData)), "id");
  message.rolesMentions = Collection(messageData.mention_roles.map((roleData) => createRole(roleData)), "id");

  if(messageData.mention_channels) {
    message.channelsMentions = Collection(messageData.mention_channels.map((channelData) => createChannel(channelData)), "id");
  }

  return message;
});

module.exports = createMessage;