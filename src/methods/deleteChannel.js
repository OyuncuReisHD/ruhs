const deleteChannel = (async (channelID) => {
  const request = require("../utils/request.js");


  if(typeof channelID !== "string") throw new TypeError("You must specify the channel's id to delete a channel.");

  await request("DELETE", `/channels/${channelID}`);
});

module.exports = deleteChannel;
