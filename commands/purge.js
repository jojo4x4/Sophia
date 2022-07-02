const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('deletes set number of messages')
		.addIntegerOption(option => option.setName('messages_to_delete').setDescription('Enter an number of messages to purge')),
	async execute(interaction) {
		const numberOfMessages = interaction.options.getInteger('messages_to_delete')
		
		if(numberOfMessages > 99) return interaction.reply("You cannot delete that many messages.")
		if(numberOfMessages < 1) return interaction.reply("Enter a positive number of messages to delete.")

		interaction.channel.bulkDelete(numberOfMessages)
			.then(messages => {
				return interaction.reply(`Bulk deleted ${messages.size} message(s)`);
			})
			.catch(console.error);
			
	}		
};