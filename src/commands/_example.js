module.exports.structure = Object.freeze({ // Remove if not slash command
  name: 'command',
  description: 'A very cool description',
});

module.exports.execute = (client, interaction) => {
  interaction.reply('Hello world!');
};
