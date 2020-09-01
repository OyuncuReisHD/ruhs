const axios = require("axios");

const request = (async(method, path, token, requestData) => {
  return new Promise((resolve) => {
    (async() => {
      axios({
        method,
        url: "http://discord.com/api/v6" + path,
        data: requestData,
        headers: {
          Authorization: "Bot " + token
        }
      }).then(({data}) => {
        resolve(data);
      }).catch(({response}) => {
        setTimeout(async() => {
          await request(method, path, token, requestData);
        }, response.data.retry_after);
      });
    })();
  });
});

module.exports = request;
