const config = require('../config');

module.exports.structure = Object.freeze({
  name: 'invite',
  description: 'Add me to your Discord server!',
});

module.exports.execute = (client, interaction) => {
  interaction.reply({
    content: `${config.emojis.wave} So you want to add me to your Discord server?`,
    components: [{
      type: 1,
      components: [{
        type: 2,
        style: 5,
        label: 'Click here to add me!',
        url: config.inviteURL,
      }],
    }],
    ephemeral: true,
  });
};
