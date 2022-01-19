const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log('Connected');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
        const then = Date.now();
		await interaction.reply('Pong!').then(() => interaction.editReply(`Pong! It took ${Date.now() - then}ms to send`));
	} 
});

client.login(token);
