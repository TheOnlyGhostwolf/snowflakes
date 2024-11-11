/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable prefer-const */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('../src/config')[process.argv.includes('development') ? 'development' : 'production'];

const client = new Discord.Client({ intents: [] });

const interactionArray = [];
fs.readdir(path.resolve(__dirname, '..', 'src', 'commands'), (err, files) => {
  if (err) return console.error(err);
  const commands = files.filter((f) => !f.startsWith('_') && f.endsWith('.js')).map((f) => f.slice(0, -3));
  commands.forEach((command) => {
    let loadedCommand = require(`../src/commands/${command}`);
    if (loadedCommand.structure) interactionArray.push(loadedCommand.structure);
  });
});

client.on('ready', () => {
  console.log('Trying to register slash commands...');
  client.application.commands.set(interactionArray).then(() => {
    console.log('Successfully registered commands!');
    client.destroy();
  }).catch((err) => {
    console.error(err);
    client.destroy();
  });
});

client.login(token);
