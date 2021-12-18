const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  configuration: {
    guildBanned: { type: Boolean, default: false },
    dropRate: { type: Number, required: true, default: 20 },
    cooldown: { type: Number, required: true, default: 30 },
    dropChannels: [{ type: String }],
    logChannel: { type: String },
    publicLeaderboard: { type: Boolean, required: true, default: true },
    bannedUsers: { type: Map, required: true, default: new Map() },
  },
  leaderboard: { type: Map, required: true, default: new Map() },
});

module.exports = mongoose.model('Guild', GuildSchema);
