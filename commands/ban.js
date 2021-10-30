const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Allows the admin or owner to ban the member.")
    .addUserOption((option) => option.setName('user').setDescription('The person who you want to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason to ban member').setRequired(true)),
    async execute(interaction) {}
};