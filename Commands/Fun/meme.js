const { MessageEmbed } = require("discord.js");
const Memer = require("random-jokes-api");
const { Command } = require("reconlx");

module.exports = new Command({
  name: "meme",
  description: "Sends a random meme",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/meme",

  run: async ({ client, interaction, args }) => {
    const meme = Memer.meme();

    const embed = new MessageEmbed()
      .setTitle(meme.title)
      .setImage(meme.url)
      .setFooter({ text: `Categroy: ${meme.category}` })
      .setColor("AQUA")
      .setTimestamp();

    await interaction.followUp({
      embeds: [embed],
      ephemeral: false,
    });
  },
});
