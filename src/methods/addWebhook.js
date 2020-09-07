const request = require("../utils/request.js");

const addWebhook = (async (channelID, data) => {
    let webhook = await request("POST", "/channels/" + channelID + "/webhooks", {
        "name": data.name,
        "avatar": data.avatar || null
    });

    return webhook
});

module.exports = addWebhook;
