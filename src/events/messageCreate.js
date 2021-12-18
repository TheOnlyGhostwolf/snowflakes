const Discord = require('discord.js');
const { emojis, overlays } = require('../config');
const database = require('../modules/database');

module.exports = async (client, message) => {
  const serverConfig = await process.configurations.get(message.guild.id);
  // eslint-disable-next-line no-useless-return
  if (!serverConfig || message.author.bot || message.channel.type !== 'GUILD_TEXT' || serverConfig.guildBanned || process.cooldowns.includes(message.guild.id) || !serverConfig.dropChannels.includes(message.channel.id)) return;

  if (Math.floor(Math.random() * serverConfig.dropRate) !== 0) return;
  process.cooldowns.push(message.guild.id);
  const sentMessage = await message.channel.send({
    content: `${emojis.main} A new snowflake just dropped!`,
    components: [new Discord.MessageActionRow()
      .addComponents([
        new Discord.MessageButton({
          label: 'Catch the snowflake!',
          emoji: emojis.main,
          customId: `c${message.id}`,
          style: 'SECONDARY',
        })])],
  });
  const filter = async (interaction) => interaction.customId === `c${message.id}` && !await serverConfig.bannedUsers.get(interaction.user.id);
  try {
    const collected = await sentMessage.awaitMessageComponent({ filter, time: 10000 });
    const points = await database.getUserPoints(message.guild.id, collected.user.id);
    await database.setUserPoints(message.guild.id, collected.user.id, points + 1);
    sentMessage.edit({ content: `${emojis.main} <@${collected.user.id}> caught the snowflake!`, embeds: [new Discord.MessageEmbed().setColor('#262335').setImage(`${overlays}${collected.user.id}/${collected.user.avatar}`)], components: [] });
    setTimeout(() => {
      sentMessage.delete();
    }, 10000);
    setTimeout(() => {
      process.cooldowns = process.cooldowns.filter((e) => e !== message.guild.id);
    }, serverConfig.cooldown * 1000);
  } catch (err) {
    sentMessage.delete();
    setTimeout(() => {
      process.cooldowns = process.cooldowns.filter((e) => e !== message.guild.id);
    }, serverConfig.cooldown * 1000);
  }
};
