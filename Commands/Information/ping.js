const { MessageEmbed } = require("discord.js");
const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");

module.exports = new Command({
  name: "ping",
  description: "Shows the API and Latency ping of the bot!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Information",

  run: async ({ client, interaction, args }) => {
    const embed = new MessageEmbed()
      .setDescription(
        `Latency is ${
          Date.now() - interaction.createdTimestamp
        }ms. API Latency is ${Math.round(client.ws.ping)}ms`
      )
      .setColor(ee.embed_color)
      .setFooter(ee.embed_footertext, ee.embed_footericon);

    interaction.followUp({
      embeds: [embed],
      ephemeral: false,
    });
  },
});
