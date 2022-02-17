const { Command } = require("reconlx");
const Memer = require("random-jokes-api");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "quote",
  description: "Tells a random quote!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/quote",

  run: async ({ client, interaction, args }) => {
    const quote = Memer.quotes();
    const embed = new MessageEmbed()
      .setTitle("Random Quote")
      .setColor("AQUA")
      .setDescription(quote)
      .setTimestamp();

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed] });
  },
});
