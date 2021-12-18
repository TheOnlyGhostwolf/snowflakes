/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* lol */

const fs = require('fs');

module.exports.loadCommands = (client) => new Promise((resolve, reject) => {
  fs.readdir('./src/commands', (err, files) => {
    if (err) return reject(err);
    fs.readdir('./src/commands/config', (err, configFiles) => {
      if (err) return reject(err);
      files = files.filter((f) => !f.startsWith('_') && f.endsWith('.js')).map((f) => f.slice(0, -3));
      configFiles = configFiles.filter((f) => !f.startsWith('_') && f.endsWith('.js')).map((f) => f.slice(0, -3));
      client.commands = new Map();
      client.settingsModules = new Map();
      files.forEach((command) => {
        let loadedCommand = require(`../commands/${command}`);
        client.commands.set(command, loadedCommand.execute);
      });
      configFiles.forEach((command) => {
        let loadedCommand = require(`../commands/config/${command}`);
        client.settingsModules.set(command.toLowerCase(), loadedCommand.execute);
      });
      resolve();
    });
  });
});

module.exports.loadEvents = (client) => new Promise((resolve, reject) => {
  fs.readdir('./src/events', (err, files) => {
    if (err) return reject(err);
    const events = files.filter((f) => !f.startsWith('_') && f.endsWith('.js')).map((f) => f.slice(0, -3));
    events.forEach((event) => {
      let loadedEvent = require(`../events/${event}`);
      client.on(event, (...args) => {
        try {
          loadedEvent(client, ...args);
        } catch (error) {
          console.error(error);
        }
      });
    });
    resolve();
  });
});
