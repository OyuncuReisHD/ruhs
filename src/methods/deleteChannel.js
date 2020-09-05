const request = require("../utils/request.js");

const deleteChannel = (async (channelID) => {
  await request("DELETE", `/channels/${channelID}`);
});

module.exports = deleteChannel;
