const ruhs = require("ruhs"); // Import ruhs module 
const token = "TOKEN"; // Enter your DISCORD bot app token 

ruhs.eventHandlers.messageCreate = ((message) => { // Create the messageCreate event
  if (message.content === "ping") { // Create a message content
      ruhs.sendMessage(message.channel().id, "Pong!") // If the specified message content is "ping" send message
  }
});

(async () => {
  await ruhs.createClient(token, { // Create a ruhs client and define the token variable
    "intents": "ALL" // ruhs client options
  });
})();
