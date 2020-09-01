const axios = require("axios");

const request = (async(method, path, token, requestData) => {
  return new Promise((resolve) => {
    (async() => {
      const {data} = await axios({
        method,
        url: "http://discord.com/api/v6" + path,
        data: requestData,
        headers: {
          Authorization: "Bot " + token
        }
      });

      if(data.retry_after) {
        setTimeout(async() => {
          await request(method, path, token, requestData);
        }, data.retry_after);
      } else {
        resolve(data);
      }
    })();
  });
});

module.exports = request;
