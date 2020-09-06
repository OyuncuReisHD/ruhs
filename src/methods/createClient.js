const createClient = (async (token, options = {}) => {
  const {createSocket} = require("./createSocket.js");


  await createSocket(token, options);
});

module.exports = createClient;
