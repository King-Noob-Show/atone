const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const ee = require('../../settings/embed.json');

module.exports = new Command({
    // options
    name: 'ping',
    description: `Shows Bot's Ping`,
    userPermissions: ['SEND_MESSAGES'],
    category : "Information",
    // command start
    run: async ({ client, interaction, args }) => {
        interaction.followUp({content: `My ping is ${client.ws.ping}`})
    }
})