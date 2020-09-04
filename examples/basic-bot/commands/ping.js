const ruhs = require("ruhs"); // Import ruhs module 

module.exports = { // Create command export 
	name: 'ping', // Add command name
	execute(message) { // Execute message and args
		ruhs.sendMessage(message.channel.id, "Pong!") // Send "Pong!" message
	},
};
