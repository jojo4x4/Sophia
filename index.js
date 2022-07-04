const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const eventFile of eventFiles) {
	const event = require(path.join(eventsPath, eventFile));
	if (event.once)
		client.once(event.name, (...args) => event.execute(...args));
	else 
		client.on(event.name, (...args) => event.execute(...args));
}

client.login(token);
