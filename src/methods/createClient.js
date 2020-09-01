const createSocket = require("./createSocket.js");

const createClient = (async (token, options) => {
  await createSocket(token, options);
});

module.exports = createClient;
