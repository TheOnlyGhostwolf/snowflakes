/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
/*
I really hate how Discord displays slash commands.
Just look at this!! -> https://i.kawaii.sh/MrH1SU_.png what the fuck
*/

const { no } = require('../config').emojis;

module.exports.structure = Object.freeze({
  name: 'configuration',
  description: 'Configure the bot!',
  options: [
    {
      type: 1,
      name: 'overview',
      description: 'See the configuration',
    },
    {
      type: 1,
      name: 'points',
      description: 'View / manage user\'s points',
      options: [
        {
          type: 6,
          name: 'user',
          description: 'Which user\'s points do you want to view / manage?',
          required: true,
        },
        {
          type: 10,
          name: 'amount',
          description: 'How many points should the user have?',
        },
      ],
    },
    {
      type: 1,
      name: 'leaderboard',
      description: 'Toggle if the leaderboard should be accessible to the public.',
      options: [
        {
          type: 5,
          name: 'enabled',
          description: 'Toggle if the leaderboard should be accessible to the public.',
          required: true,
        },
      ],
    },
    {
      type: 2,
      name: 'bans',
      description: 'Manage banned users.',
      options: [
        {
          type: 1,
          name: 'list',
          description: 'List all banned users.',
          options: [],
        },
        {
          type: 1,
          name: 'ban',
          description: 'Ban the user from the event and clear their snowflakes count.',
          options: [
            {
              type: 6,
              name: 'user',
              description: 'Which user should I ban?',
              required: true,
            },
          ],
        },
        {
          type: 1,
          name: 'unban',
          description: 'Unban the user and allow them to participate in the event again.',
          options: [
            {
              type: 6,
              name: 'user',
              description: 'Which user should I unban?',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 2,
      name: 'drops',
      description: 'Manage snowflake drops.',
      options: [
        {
          type: 1,
          name: 'cooldown',
          description: 'How long should the bot wait before dropping a snowflake again?',
          options: [
            {
              type: 4,
              name: 'seconds',
              description: 'How long should the bot wait?',
              required: true,
            },
          ],
        },
        {
          type: 1,
          name: 'rate',
          description: 'What the drop rate should be?',
          options: [
            {
              type: 4,
              name: 'amount',
              description: 'The bot should drop a snowflake 1 in N messages.',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 2,
      name: 'channels',
      description: 'Configure, where snowflakes should be dropped.',
      options: [
        {
          type: 1,
          name: 'list',
          description: 'List all toggled channels.',
          options: [],
        },
        {
          type: 1,
          name: 'add',
          description: 'Allow the bot to drop snowflakes in the following channel.',
          options: [
            {
              type: 7,
              name: 'channel',
              description: 'Where should I drop snowflakes?',
              required: true,
            },
          ],
        },
        {
          type: 1,
          name: 'remove',
          description: 'Stop the bot from dropping snowflakes in the following channel.',
          options: [
            {
              type: 7,
              name: 'channel',
              description: 'Where should I stop dropping snowflakes?',
              required: true,
            },
          ],
        },
      ],
    },
  ],
});

module.exports.execute = async (client, interaction) => {
  if (!interaction.memberPermissions.toArray().includes('ADMINISTRATOR')) return interaction.reply({ content: `${no} Only server administrators can use this command.`, ephemeral: true });
  const configCmd = await client.settingsModules.get(interaction.options['_group'] || interaction.options['_subcommand']);
  configCmd(client, interaction);
};
