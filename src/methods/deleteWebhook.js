const request = require("../utils/request.js");

const deleteWebhook = (async (webhookID) => {
    await request("DELETE", "/webhooks/" + webhookID);
});

module.exports = deleteWebhook;
