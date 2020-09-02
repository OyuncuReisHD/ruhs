const {cache} = require("../botProperties.js");

const Collection = require("../utils/Collection.js");

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

const createMessage = ((messageData) => {
  const message = ({});

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
  message.mentionedMembers = Collection(messageData.mentions.map((mentionData) => mentionData.member ? createMember(assingMemberUser(mentionData)) : createUser(mentionData)), "id");
  message.mentionedRoles = Collection(messageData.mention_roles.map((roleData) => createRole(roleData)), "id");

  if(messageData.mention_channels) {
    message.mentionedChannels = Collection(messageData.mention_channels.map((channelData) => createChannel(channelData)), "id");
  }

  return message;
});

module.exports = createMessage;