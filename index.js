const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Collection();

// Add all commands from commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log('Connected');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('voiceStateUpdate', async (oldState, newState) => {
	// clear Voice Text channel when everyone disconnects
	if (oldState.channel != null && newState.channel == null) {
		while (await oldState.channel.messages.fetch().then(messages => messages.size) > 1) 
			oldState.channel.bulkDelete(100);
	}
});

client.login(token);
