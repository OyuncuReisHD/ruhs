const ruhs = require("ruhs"); // Import ruhs module 
const token = "TOKEN"; // Enter your DISCORD bot app token 
const prefix = "!"; // Enter your DISCORD bot's prefix
const fs = require("fs"); // Import fs

ruhs.eventHandlers.ready = (() => {
  ruhs.cache.commands = ruhs.Collection(); // Create a commands cache 
  const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js")); // We found the all commands

  for (const c of commands) {
      const commands = require("./commands/" + c) // We receive commands one way
      ruhs.cache.commands.set(commands.name, commands); // We save commands in "commands cache"
  }
});

ruhs.eventHandlers.messageCreate = ((message) => { // Create the messageCreate event
  if (!message.content.startsWith(prefix) || message.author.bot) return; // Cannot response if command start does not start with prefix and user is bot

  const args = message.content.slice(prefix.length).trim().split(/ +/); // We add the argument position
  const command = args.shift().toLowerCase();  // We add the command positin
   
  if (!ruhs.cache.commands.has(command)) return; // If this command is missing, we set it not to respond.

  try {
    ruhs.cache.commands.get(command).execute(message, args); // If there is a command we executed the command
  } catch (error) {
    console.error(error) // Error 
  }
});


(async () => {
  await ruhs.createClient(token, { // Create a ruhs client and define the token variable
    "intents": "ALL" // ruhs client options
  });
})();
