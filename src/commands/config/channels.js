const database = require('../../modules/database');
const { emojis } = require('../../config');

module.exports.execute = async (client, interaction) => {
  if (interaction.options['_subcommand'] === 'list') {
    const dropChannels = await database.getDropChannels(interaction.guildId);
    interaction.reply({ content: `${emojis.main} Drops are enabled in the following channels: ${await dropChannels.map((e) => `<#${e}>`).join(' ')}` });
  }
  if (interaction.options['_subcommand'] === 'add') {
    try {
      if (interaction.options['_hoistedOptions'][0].channel.type !== 'GUILD_TEXT') return interaction.reply({ content: `${emojis.no} Only text channels can be selected.` });
      await database.addDropChannel(interaction.guildId, interaction.options['_hoistedOptions'][0].value);
      return interaction.reply(`${emojis.yes} Successfully \` enabled \` snowflake drops in <#${interaction.options['_hoistedOptions'][0].value}>!`);
    } catch (err) {
      return interaction.reply(`${emojis.no} ${err}`);
    }
  }
  if (interaction.options['_subcommand'] === 'remove') {
    try {
      if (interaction.options['_hoistedOptions'][0].channel.type !== 'GUILD_TEXT') return interaction.reply({ content: `${emojis.no} Only text channels can be selected.` });
      await database.removeDropChannel(interaction.guildId, interaction.options['_hoistedOptions'][0].value);
      return interaction.reply(`${emojis.yes} Successfully \` disabled \` snowflake drops in <#${interaction.options['_hoistedOptions'][0].value}>!`);
    } catch (err) {
      return interaction.reply(`${emojis.no} ${err}`);
    }
  }
};
