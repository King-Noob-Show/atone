const { Client, CommandInteraction, MessageEmbed, ClientPresence } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: "ban",
    description: "Ban a User!",
    options: [
          {
            type: 6,
            name: "user",
            description: "The user to ban",
            required: true
          },
          {
            type: 3,
            name: "reason",
            description: "The reason to ban",
            required: true
          }
        ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        const target = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') || 'No Reason Provided'
        
      await interaction.reply('.')
    },
};