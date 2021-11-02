const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Says whatever you provide!',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'input',
            description: 'What to say!',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction, args) => {
        await interaction.followUp(`${interaction.member.nickname} says ${interaction.options.getString('input')}`);
    },
};