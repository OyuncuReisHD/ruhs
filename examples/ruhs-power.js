const ruhs = require("./"); 
const util = require("util");
const promiseTimeout = util.promisify(setTimeout);
const token = "";


ruhs.eventHandlers.ready = (async () => {
  await promiseTimeout(1500);
  console.log(`Bot is ready with ${cache.guilds.size()} guilds.`);
});


ruhs.eventHandlers.messageCreate = (async (message) => {
  if (message.content === "pin my message") {
    await ruhs.sendMessage(message.channel.id, "Message will be pinned which sent by you in 1.25 seconds.");
    await promiseTimeout(1250);

    await ruhs.pinMessage(message.channel.id, message.id);

    await ruhs.sendMessage(message.channel.id, "Message is pinned which sent by you. I unpin this message in 1.25 seconds.");
    await promiseTimeout(1250);

    await ruhs.unpinMessage(message.channel.id, message.id);
  } else if(message.content === "send embed") {
    await ruhs.sendMessage(message.channel.id, "I'll send embed in 1.25 seconds.");
    await promiseTimeout(1250);

    const embed = new ruhs.Embed()
    .setTitle("Title")
    .setDescription("Description")
    .setAuthor("Name of author")
    .addField("Name of field", "Value of field")
    .setImage("https://camo.githubusercontent.com/f14f5a0ef3e0a51ecaf40eb5f13e2cfe45dd5b18/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3735313533363534363537383033383837342f3735323038373431343830353336343733362f727568735f322e706e67")
    .setThumbnail("https://gblobscdn.gitbook.com/spaces%2F-MGCzI9lnjjfpck66r3G%2Favatar-1599294736562.png?alt=media")
    .setColor(0x00FFFF)
    .setFooter("Text of footer")

    await ruhs.sendMessage(message.channel.id, {embed});
  } else if(message.content === "create a channel") {
    await ruhs.sendMessage(message.channel.id, "I'll create a channel in 1.25 seconds.");
    await promiseTimeout(1250);

    console.log(ruhs.cache.channels.size());

    const channel = await ruhs.addChannel(message.guild.id, {
      "name": "a-random-channel",
      "type": "text",
      "topic": "Uuu topic",
      "nsfw": false,
      // "parent": "parentID"
    });

    await ruhs.sendMessage(message.channel.id, `I created a channel, you can type in <#${channel.id}>. I'll delete this channel in 5 seconds.`);
    await promiseTimeout(5000);

    await ruhs.deleteChannel(channel.id);

    console.log(ruhs.cache.channels.size());
  } else if(message.content === "what is your ping?") {
    await ruhs.sendMessage(message.channel.id, `My ping is ${ruhs.getPing()} milliseconds.`);
  } else if(message.content === "send message and edit it") {
    let msg = await ruhs.sendMessage(message.channel.id, "I'll edit this message in 3 seconds.");
    await promiseTimeout(3000);
    await ruhs.editMessage(message.channel.id, msg.id, "I edited this message.");
  }
});

ruhs.eventHandlers.channelCreate = ((channel) => {
  console.log(`${channel.name} named channel is created.`);
});

ruhs.eventHandlers.channelDelete = ((channel) => {
  console.log(`${channel.name} named channel is deleted.`);
});



(async () => {
  await ruhs.createClient(token, {
    "intents": "ALL"
  });
})();