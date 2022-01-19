const { Client, Intents } = require('discord.js');
const { prefix, token } = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log('Connected');
});

client.login(token);
