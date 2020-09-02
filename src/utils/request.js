const axios = require("axios");
const {botInfo} = require("../botProperties.js");

const request = (async(method, path, requestData) => {
  return new Promise((resolve) => {
    axios({
      "url": "https://discord.com/api/v6" + path,
      "method": method,
      "data": requestData,
      "headers": {
        "Authorization": "Bot " + botInfo.token,
        "Content-Type": "application/json",
        "User-Agent": "DiscordBot (https://github.com/acarnd03/ruhs, 0.0.1)",
        "X-Audit-Log-Reason": requestData ? encodeURIComponent(requestData.reason) : ""
      }
    }).then(({data}) => {
      resolve(data);
    }).catch(({response}) => {
      setTimeout(async() => {
        await request(method, path, requestData);
      }, response.data.retry_after)
    });
  });
});

module.exports = request;
