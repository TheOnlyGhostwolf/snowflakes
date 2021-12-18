/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-promise-executor-return */
/* eslint-disable max-len */

const mongoose = require('mongoose');
const Guild = require('./models/Guild');

const fetchGuild = (id) => new Promise(async (resolve, reject) => {
  const foundGuild = await Guild.findOne({ id });
  if (!foundGuild) return Guild.create({ id }).then(resolve).catch(reject);
  return resolve(foundGuild);
});

const updateData = (id, data) => new Promise(async (resolve, reject) => {
  try {
    const newData = await Guild.findOneAndUpdate({ id }, data, { new: true });
    process.configurations.set(newData.id, newData.configuration);
    resolve();
  } catch (err) {
    reject(err);
  }
});

module.exports.connectToDatabase = (db) => new Promise((resolve, reject) => {
  mongoose.connect(db).then(resolve).catch(reject);
  Guild.find({}).then((guilds) => {
    guilds.forEach((g) => process.configurations.set(g.id, g.configuration));
  });
});

// Banning

module.exports.getBannedUsers = (guild) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    resolve(guildObject.configuration.bannedUsers);
  } catch (err) {
    reject(err);
  }
});

module.exports.addBannedUser = (guild, user, administrator) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    if (await guildObject.configuration.bannedUsers.get(user)) return reject(Error('The user is already banned'));
    guildObject.configuration.bannedUsers.set(user, { administrator, timestamp: Math.floor(Date.now() / 1000) });
    await updateData(guild, guildObject);
    resolve();
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.removeBannedUser = (guild, user) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    if (!await guildObject.configuration.bannedUsers.get(user)) return reject(Error('The user is not banned'));
    guildObject.configuration.bannedUsers.delete(user);
    await updateData(guild, guildObject);
    resolve();
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

// Drop channels

module.exports.addDropChannel = (guild, channel) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    if (guildObject.configuration.dropChannels.includes(channel)) return reject(Error('The channel is already enabled to receive drops.'));
    guildObject.configuration.dropChannels.push(channel);
    await updateData(guild, guildObject);
    resolve();
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.removeDropChannel = (guild, channel) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    if (!guildObject.configuration.dropChannels.includes(channel)) return reject(Error('The channel is not enabled to receive drops.'));
    guildObject.configuration.dropChannels = guildObject.configuration.dropChannels.filter((e) => e !== channel);
    await updateData(guild, guildObject);
    resolve();
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.getDropChannels = (guild) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    resolve(guildObject.configuration.dropChannels);
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

// Variables

module.exports.getCooldown = (guild) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    resolve(guildObject.configuration.cooldown);
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.setCooldown = (guild, cooldown) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    guildObject.configuration.cooldown = cooldown;
    await updateData(guild, guildObject);
    resolve();
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.getDropRate = (guild) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    resolve(guildObject.configuration.dropRate);
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.setDropRate = (guild, dropRate) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    guildObject.configuration.dropRate = dropRate;
    await updateData(guild, guildObject);
    resolve();
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

// Leaderboard

module.exports.getLeaderboardStatus = (guild) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    resolve(guildObject.configuration.publicLeaderboard);
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.setLeaderboardStatus = (guild, status) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    guildObject.configuration.publicLeaderboard = status;
    await updateData(guild, guildObject);
    resolve();
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

// Members points

module.exports.getLeaderboard = (guild) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    resolve(guildObject.leaderboard);
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.getUserPoints = (guild, user) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    resolve(await guildObject.leaderboard.get(user) || 0);
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});

module.exports.setUserPoints = (guild, user, points) => new Promise(async (resolve, reject) => {
  try {
    const guildObject = await fetchGuild(guild);
    guildObject.leaderboard.set(user, points);
    await updateData(guild, guildObject);
    resolve();
  } catch (err) {
    console.error(err);
    reject(Error('Something went wrong. Try again later'));
  }
});
