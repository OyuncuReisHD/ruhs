const getPing = (() => {
  const {botInfo} = require("../botProperties.js");


  return botInfo.pings.reduce((acc, curr) => (acc + curr), 0) / botInfo.pings.length;
});

module.exports = getPing;
