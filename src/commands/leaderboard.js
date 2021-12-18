/* eslint-disable consistent-return */
const Discord = require('discord.js');
const { emojis } = require('../config');
const database = require('../modules/database');

module.exports.structure = Object.freeze({ // Remove if not slash command
  name: 'leaderboard',
  description: 'See Top 10 people who have the most points!',
});

module.exports.execute = async (client, interaction) => {
  try {
    if (!await process.configurations.get(interaction.guildId).publicLeaderboard && !interaction.memberPermissions.toArray().includes('ADMINISTRATOR')) return interaction.reply({ content: `${emojis.no} Sorry! The leaderboard has been disabled in this server.`, ephemeral: true });
    const data = await database.getLeaderboard(interaction.guildId);
    const sortedData = Array.from(data, ([id, count]) => ({ id, count })).sort((a, b) => a.count - b.count).reverse().slice(0, 10);
    const reply = [];
    if (sortedData.length === 0) reply.push('> *Nobody has any snowflake :(*');
    await sortedData.forEach((e) => reply.push(`> <@${e.id}> - ${emojis.main} **${e.count}**`));
    interaction.reply({ embeds: [new Discord.MessageEmbed({ title: `${emojis.main} Leaderboard`, description: reply.join('\n'), color: 'BLURPLE' })], ephemeral: !await process.configurations.get(interaction.guildId).publicLeaderboard });
  } catch (err) {
    console.error(err);
  }
};
