const deleteChannel = (async (channelID) => {
  const request = require("../utils/request.js");


  await request("DELETE", `/channels/${channelID}`);
});

module.exports = deleteChannel;
