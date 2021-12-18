/* eslint-disable consistent-return */
const database = require('../../modules/database');
const { emojis } = require('../../config');

module.exports.execute = async (client, interaction) => {
  try {
    if (!interaction.options['_hoistedOptions'][1]) { // Only check points
      return interaction.reply({ content: `${emojis.main} <@${interaction.options['_hoistedOptions'][0].value}> has **${await database.getUserPoints(interaction.guildId, interaction.options['_hoistedOptions'][0].value)}** snowflake(s).`, ephemeral: true });
    }
    if (interaction.options['_hoistedOptions'][1]) { // Set points
      if (interaction.options['_hoistedOptions'][1].value < 0) return interaction.reply({ content: `${emojis.no} You can't set less than 0 points.`, ephemeral: true });
      if (interaction.options['_hoistedOptions'][1].value > 100000) return interaction.reply({ content: `${emojis.no} Why?`, ephemeral: true });
      const oldPoints = await database.getUserPoints(interaction.guildId, interaction.options['_hoistedOptions'][0].value);
      await database.setUserPoints(interaction.guildId, interaction.options['_hoistedOptions'][0].value, interaction.options['_hoistedOptions'][1].value);
      return interaction.reply({ content: `${emojis.yes} Successfully changed \` ${interaction.options['_hoistedOptions'][0].user.username} \` points: \` ${oldPoints} -> ${interaction.options['_hoistedOptions'][1].value} \`` });
    }
  } catch (err) {
    console.error(err);
  }
};
