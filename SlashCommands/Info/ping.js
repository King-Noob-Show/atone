//Ping Command?
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Check Your Ping!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `Pong! Ping is ${client.ws.ping}ms!` });
    },
};