const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('say')
        .setDescription('Says Whatever you Provide!')
        .addStringOption(option => 
            option.setName('input')
            .setDescription('The input to say back!')
            .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(interaction.options.getString('input'));
    },
};