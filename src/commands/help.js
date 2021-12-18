const config = require('../config');

module.exports.structure = Object.freeze({
  name: 'help',
  description: 'Find out how to use me!',
});

module.exports.execute = (client, interaction) => {
  interaction.reply({
    content: [
      `${config.emojis.wave} Hello! I'm **${client.user.username}**! Sometimes, I will drop you ${config.emojis.main} snowflakes to catch! Prove that you're the best by catching the most snowflakes!`,
      'You can find more information about me [by visiting this page](<https://snowflakes.froggy.wtf/docs>). If you need any help, [feel free to join our support server](<https://froggy.wtf/>)!',
      'Good luck and catch those snowflakes!',
      `${config.emojis.main} Happy holidays! ${config.emojis.main}`,
    ].join('\n'),
    ephemeral: true,
  });
};
