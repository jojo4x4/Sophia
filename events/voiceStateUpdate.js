module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
		// clear Voice Text channel when everyone disconnects
        if (oldState.channel != null && newState.channel == null) {
            while (await oldState.channel.messages.fetch().then(messages => messages.size) > 1) 
                oldState.channel.bulkDelete(100);
        }
	},
};