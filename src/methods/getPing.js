const {botInfo} = require("../botProperties.js");

const getPing = (() => {
  return botInfo.pings.reduce((acc, curr) => (acc + curr), 0) / botInfo.pings.length;
});

module.exports = getPing;
