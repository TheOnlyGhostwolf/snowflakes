/* eslint-disable consistent-return */
// eslint-disable-next-line consistent-return
const { no } = require('../config').emojis;

module.exports = async (client, interaction) => {
  if (interaction.isButton()) return;
  let guild;
  try {
    guild = await client.guilds.fetch(interaction.guildId);
  } catch (e) {
    guild = undefined;
  }
  if (!guild) return interaction.reply({ content: `${no} Hey! I can't be used since I wasn't added properly. Ask the server administrators to add me properly again (both slash commands and the user) using the following link: <https://snowflakes.froggy.wtf/>`, ephemeral: true });

  if (!interaction.commandName) return console.error(`No command name: ${interaction.commandName}`);
  const command = client.commands.get(interaction.commandName);
  if (!command) return console.error(`Invalid command: ${interaction.commandName}`);
  try {
    command(client, interaction);
  } catch (error) {
    console.error(error);
  }
};
