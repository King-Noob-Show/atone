const { Command } = require("reconlx");
const Memer = require("random-jokes-api");
const { MessageEmbed } = require("discord.js");
const ee = require("../../settings/embed.json");

module.exports = new Command({
  name: "shower-thought",
  description: "Sends a Random Shower Thought",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/shower-thought",

  run: async ({ client, interaction, args }) => {
    const shower = Memer.showerThought();

    const embed = new MessageEmbed()
      .setTitle("Random Shower Thought")
      .setDescription(shower)
      .setColor("AQUA")
      .setTimestamp();

    await interaction.followUp({
      embeds: [embed],
      ephemeral: false,
    });
  },
});
