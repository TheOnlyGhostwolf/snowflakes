const { emojis } = require('../../config');

module.exports.execute = async (client, interaction) => {
  const data = await process.configurations.get(interaction.guildId);
  interaction.reply({
    content: [
      `${emojis.wave} Hello! Here's how this server is configured:`,
      `> **Drop rate**: \` 1 / ${data.dropRate} \` messages`,
      `> **Cooldown**: \` ${data.cooldown} \` seconds`,
      `> **Leaderboard** is \` ${data.publicLeaderboard ? 'public' : 'not public'} \``,
      `> There are \` ${data.dropChannels.length} \` **channels**, where I drop ${emojis.main} snowflakes`,
      `> There are \` ${data.bannedUsers.size} \` **banned** users`,
      'If you have any questions how to configure something, [be sure to check out my documentation](https://snowflakes.froggy.wtf/docs)!',
    ].join('\n'),
  });
};
