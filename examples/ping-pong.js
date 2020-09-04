const ruhs = require("ruhs");
const token = "TOKEN";

ruhs.eventHandlers.messageCreate = ((message) => {
  if (message.content === "ping") {
      ruhs.sendMessage(message.channel().id, "Pong!")
  }
});

(async () => {
  await ruhs.createClient(token, {
    "intents": "ALL"
  });
})();
