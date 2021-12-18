/* eslint-disable no-console */
const Discord = require('discord.js');
const config = require('./config')[process.argv.includes('development') ? 'development' : 'production'];
const { loadCommands, loadEvents } = require('./modules/loading');
const { connectToDatabase } = require('./modules/database');

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

process.cooldowns = [];
process.configurations = new Map();

// eslint-disable-next-line no-unused-expressions
const launch = async () => {
  try {
    await connectToDatabase(config.database, client);
    await loadCommands(client);
    await loadEvents(client);
    client.login(config.token);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

launch();
