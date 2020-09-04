const ruhs = require("ruhs"); // Import ruhs module
const token = "NzUwNjUzODIzMzM2MzE2OTU5.X09q2Q.kbkUuIJ8F6ip5s6lrvUijeYQO6Y"; // Enter your DISCORD bot app token

ruhs.eventHandlers.guildMemberAdd = ((member) => { // Create the guildMemberAdd event
    ruhs.sendMessage("750728553569452103", `Welcome ${member.user.tag}`) // Send message a "Welcome User#0000" to the specified channel ID
});

(async () => {
  await ruhs.createClient(token, { // Create a ruhs client and define the token variable
    "intents": "ALL" // ruhs client options
  });
})();
