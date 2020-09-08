const sendWithWebhook = (async (webhookID, webhookToken, data) => {
  const request = require("../utils/request.js");

  const webhook = await request("POST", "/webhooks/" + webhookID + "/" + webhookToken, {
    "username": data.username || false,
    "avatar_url": data.avatar_url || false,
    "content": data.content,
    "embeds": data.embed || null,
    "tts": data.tts || false
  });

  return webhook;
});

module.exports = sendWithWebhook;
