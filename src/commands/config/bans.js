/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
const database = require('../../modules/database');
const { emojis } = require('../../config');

module.exports.execute = async (client, interaction) => {
  if (interaction.options['_subcommand'] === 'list') {
    const bannedUsers = await database.getBannedUsers(interaction.guildId);
    const converted = Array.from(bannedUsers, ([id, data]) => ({ id, data }));
    const list = [];
    await converted.forEach((e) => list.push(`\` ${e.id} \` - 🔨 \` ${e.data.administrator} \` @ <t:${e.data.timestamp}:f>`));
    interaction.reply({ content: list.length > 0 ? list.join('\n') : 'There are no banned users!' });
  }
  if (interaction.options['_subcommand'] === 'ban') {
    try {
      await database.addBannedUser(interaction.guildId, interaction.options['_hoistedOptions'][0].value, interaction.user.id);
      return interaction.reply(`${emojis.yes} Successfully banned \` ${interaction.options['_hoistedOptions'][0].user.username} \` `);
    } catch (err) {
      return interaction.reply(`${emojis.no} ${err}`);
    }
  }
  if (interaction.options['_subcommand'] === 'unban') {
    try {
      await database.removeBannedUser(interaction.guildId, interaction.options['_hoistedOptions'][0].value);
      return interaction.reply(`${emojis.yes} Successfully unbanned \` ${interaction.options['_hoistedOptions'][0].user.username} \` `);
    } catch (err) {
      return interaction.reply(`${emojis.no} ${err}`);
    }
  }
};
