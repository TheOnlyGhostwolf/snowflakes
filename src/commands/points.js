const database = require('../modules/database');
const { emojis } = require('../config');

module.exports.structure = Object.freeze({ // Remove if not slash command
  name: 'points',
  description: 'See how many points you have!',
});

module.exports.execute = async (client, interaction) => {
  interaction.reply({ content: `${emojis.wave} You have ${emojis.main} **${await database.getUserPoints(interaction.guildId, interaction.user.id) || 0}** snowflake(s)`, ephemeral: true });
};
