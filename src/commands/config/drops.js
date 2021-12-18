const database = require('../../modules/database');
const { emojis } = require('../../config');

module.exports.execute = async (client, interaction) => {
  if (interaction.options['_subcommand'] === 'cooldown') {
    try {
      if (interaction.options['_hoistedOptions'][0].value < 0 || interaction.options['_hoistedOptions'][0].value > 3600) return interaction.reply({ content: `${emojis.no} The vakue must be between \` 0 - 3600 \``, ephemeral: true });
      await database.setCooldown(interaction.guildId, interaction.options['_hoistedOptions'][0].value);
      return interaction.reply(`${emojis.yes} Successfully set the cooldown to \` ${interaction.options['_hoistedOptions'][0].value} \`.`);
    } catch (err) {
      return interaction.reply(`${emojis.no} ${err}`);
    }
  }
  if (interaction.options['_subcommand'] === 'rate') {
    try {
      if (interaction.options['_hoistedOptions'][0].value < 0 || interaction.options['_hoistedOptions'][0].value > 10000) return interaction.reply({ content: `${emojis.no} The vakue must be between \` 0 - 10000 \``, ephemeral: true });
      await database.setDropRate(interaction.guildId, interaction.options['_hoistedOptions'][0].value);
      return interaction.reply(`${emojis.yes} Successfully set the drop rate to \` 1 / ${interaction.options['_hoistedOptions'][0].value} \`.`);
    } catch (err) {
      return interaction.reply(`${emojis.no} ${err}`);
    }
  }
};
