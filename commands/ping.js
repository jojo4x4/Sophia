const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const then = Date.now();
		await interaction.reply('Pong!').then(() => interaction.editReply(`Pong! It took ${Date.now() - then}ms to send`));
	},
};