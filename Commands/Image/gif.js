const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
config();
const giphy = require("giphy-api")(process.env.GIPHY);

module.exports = new Command({
  name: "gif",
  description: "Search a gif",
  userPermissions: ["SEND_MESSAGES"],
  category: "Image",
  usage: "/gif <query>",
  options: [
    {
      name: "query",
      description: "The query to search.",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const qq = interaction.options.getString("query");
    if (!qq) {
      const embed2 = new MessageEmbed()
        .setColor("AQUA")
        .setDescription("**Please Enter A Search Query!**");
      return interaction.followUp({ embeds: [embed2], allowedMentions: false });
    }
    try {
      const search = interaction.options.getString("query");
      giphy.search(search).then(function (res) {
        let id = res.data[0].id;
        let url = `https://media.giphy.com/media/${id}/giphy.gif`;
        const embed = {
          color: "AQUA",
          timestamp: new Date(),
          footer: {
            text: interaction.guild.name,
            icon_url: interaction.guild.iconURL(),
          },
          image: {
            url: url,
          },
        };
        return interaction.followUp({ embeds: [embed] });
      });
    } catch {
      return interaction.followUp("**Not Found!**");
    }
  },
});
