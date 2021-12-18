const { emojis } = require('../../config');
const database = require('../../modules/database');

module.exports.execute = async (client, interaction) => {
  try {
    await database.setLeaderboardStatus(interaction.guildId, interaction.options['_hoistedOptions'][0].value);
    interaction.reply({ content: `${emojis.yes} The leaderboard is now \` ${interaction.options['_hoistedOptions'][0].value ? 'public' : 'hidden from the public'} \`.` });
  } catch (err) {
    console.error(err);
    interaction.reply({ content: `${emojis.no} Something went wrong. Try again later.`, ephemeral: true });
  }
};
