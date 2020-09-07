const {cache} = require("../botProperties.js");
const request = require("../utils/request.js")
const createUser = require("./createUser.js");

const createInvite = (async(data) => {

	const d = {};

	data = data[0]

	d.guild = cache.guilds.get(data.guild.id);

	if(data.inviter) {
		var req = await request("GET", "/users/"+data.inviter.id)
		d.inviter = createUser(req);
	}

	if(data.channel) {
		d.channel = cache.channels.get(data.channel.id);
	}

	d.uses = data.uses;
	d.max_uses = data.max_uses;
	d.max_age = data.max_age;
	d.temporary = data.temporary;
	d.createdAt = data.created_at;

	return d;
});

module.exports = createInvite;
